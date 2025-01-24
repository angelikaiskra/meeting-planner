import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import userService from './user.service';
import bcrypt from 'bcrypt';
import prisma from '../client';
import { TokenType, User } from '@prisma/client';
import { AuthTokensResponse } from '../types/token.interface';
import tokenService from './token.service';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Omit<User, 'password'>>}
 */
const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Omit<User, 'password'>> => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password as string))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return {
    id: user.id,
    uuid: user.uuid,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const logout = async (refreshToken: string) => {
  const refreshTokenData = await prisma.token.findFirst({
    where: {
      token: refreshToken,
      type: TokenType.REFRESH,
      blacklisted: false
    }
  });

  if (!refreshTokenData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
  }

  await prisma.token.delete({
    where: {
      id: refreshTokenData.id
    }
  });
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<AuthTokensResponse>}
 */
const refreshAuth = async (refreshToken: string): Promise<AuthTokensResponse> => {
  try {
    const refreshTokenData = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);
    const { userId } = refreshTokenData;
    await prisma.token.delete({
      where: {
        id: refreshTokenData.id
      }
    });

    return tokenService.generateAuthTokens(userId);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

export default {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth
};
