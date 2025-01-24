import { Strategy as JwtStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt';
import { TokenType } from '@prisma/client';
import prisma from '../client';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET ?? '',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    if (payload.type !== TokenType.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        uuid: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      },
      where: { id: payload.sub }
    });
    if (!user) {
      return done(null, null);
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;