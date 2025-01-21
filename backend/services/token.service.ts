import jwt from 'jsonwebtoken';
import { Token, TokenType } from '@prisma/client';
import prisma from '../client';
import { AuthTokensResponse } from '../types/token.interface';

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Generate token
 * @param {number} userId
 * @param {Date} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  userId: number,
  expires: Date,
  type: TokenType,
  secret = JWT_SECRET
): string => {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(expires.getTime() / 1000),
    type
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {number} userId
 * @param {Date} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (
  token: string,
  userId: number,
  expires: Date,
  type: TokenType,
  blacklisted = false
): Promise<Token> => {
  return prisma.token.create({
    data: {
      token,
      userId: userId,
      expires: expires,
      type,
      blacklisted
    }
  });
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token: string, type: TokenType): Promise<Token> => {
  const payload = jwt.verify(token, JWT_SECRET);
  const userId = Number(payload.sub);
  const tokenData = await prisma.token.findFirst({
    where: {
      token,
      type,
      userId,
      blacklisted: false
    }
  });

  if (!tokenData) {
    throw new Error('Token not found');
  }

  return tokenData;
};

/**
 * Generate auth tokens
 * @returns {Promise<AuthTokensResponse>}
 * @param userId
 */
const generateAuthTokens = async (userId: number): Promise<AuthTokensResponse> => {
  const accessExpirationMinutes = +(process.env.JWT_ACCESS_EXPIRATION_MINUTES ?? 30);
  const accessTokenExpires = new Date(Date.now() + accessExpirationMinutes * 60 * 1000); // to minutes
  const accessToken = generateToken(userId, accessTokenExpires, TokenType.ACCESS);

  const refreshExpirationDays = +(process.env.JWT_REFRESH_EXPIRATION_DAYS ?? 30);
  const refreshTokenExpires = new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000); // to days
  const refreshToken = generateToken(userId, refreshTokenExpires, TokenType.REFRESH);
  await saveToken(refreshToken, userId, refreshTokenExpires, TokenType.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires
    }
  };
};


export default {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens
};