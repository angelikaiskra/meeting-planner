import { insertUsers, userOne } from '../fixtures/user.fixture';
import prisma from '../../client';
import { TokenType, User } from '@prisma/client';
import tokenService from '../../services/token.service';

export const createAndLoginUserOne = async () => {
  await insertUsers([userOne]);
  const dbUserOne = (await prisma.user.findUnique({ where: { email: userOne.email } })) as User;
  const accessExpirationDays = +(process.env.JWT_ACCESS_EXPIRATION_MINUTES ?? 30);
  const accessTokenExpires = new Date(Date.now() + accessExpirationDays * 60 * 1000); // to minutes
  const userOneAccessToken = tokenService.generateToken(
    dbUserOne.id,
    accessTokenExpires,
    TokenType.ACCESS
  );

  return {
    user: dbUserOne,
    accessToken: userOneAccessToken
  }
}