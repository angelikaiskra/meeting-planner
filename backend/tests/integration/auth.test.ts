import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import { TokenType, User } from '@prisma/client';
import { describe, beforeEach, test, expect, jest } from '@jest/globals';

import setupTestDB from '../utils/setupTestDb';
import { app } from '../../server';
import prisma from '../../client';
import { insertUsers, userOne } from '../fixtures/user.fixture';
import tokenService from '../../services/token.service';

setupTestDB();

describe('Auth routes', () => {
  describe('POST /api/auth/register', () => {
    let newUser = {
      email: "",
      password: ""
    };

    beforeEach(() => {
      newUser = {
        email: faker.internet.email().toLowerCase(),
        password: 'password1'
      };
    });

    test('should return 201 and successfully register user if request data is ok', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body.user).not.toHaveProperty('password');
      expect(res.body.user).toEqual({
        id: expect.anything(),
        uuid: expect.anything(),
        name: null,
        email: newUser.email
      });

      const dbUser = await prisma.user.findUnique({ where: { id: res.body.user.id } });
      expect(dbUser).toBeDefined();
      expect(dbUser?.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({
        name: null,
        email: newUser.email
      });

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() }
      });
    });

    test('should return 400 error if email is invalid', async () => {
      newUser.email = 'invalidEmail';

      await request(app).post('/api/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if email is already used', async () => {
      await insertUsers([userOne]);
      newUser.email = userOne.email;

      await request(app).post('/api/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if password length is less than 8 characters', async () => {
      newUser.password = 'passw11';

      await request(app).post('/api/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('POST /api/auth/login', () => {
    test('should return 200 and login user if email and password match', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password
      };

      const res = await request(app)
        .post('/api/auth/login')
        .send(loginCredentials)
        .expect(httpStatus.OK);

      expect(res.body.user).toMatchObject({
        id: expect.anything(),
        uuid: expect.anything(),
        name: userOne.name,
        email: userOne.email
      });

      expect(res.body.user).toEqual(expect.not.objectContaining({ password: expect.anything() }));

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() }
      });
    });

    test('should return 401 error if there are no users with that email', async () => {
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password
      };

      const res = await request(app)
        .post('/api/auth/login')
        .send(loginCredentials)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'Incorrect email or password'
      });
    });

    test('should return 401 error if password is wrong', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        email: userOne.email,
        password: 'wrongPassword1'
      };

      const res = await request(app)
        .post('/api/auth/login')
        .send(loginCredentials)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'Incorrect email or password'
      });
    });
  });

  describe('POST /api/auth/logout', () => {
    test('should return 204 if refresh token is valid', async () => {
      await insertUsers([userOne]);
      const dbUserOne = (await prisma.user.findUnique({ where: { email: userOne.email } })) as User;
      const refreshExpirationDays = +(process.env.JWT_REFRESH_EXPIRATION_DAYS ?? 30);
      const refreshTokenExpires = new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000); // to days

      const refreshToken = tokenService.generateToken(dbUserOne.id, refreshTokenExpires, TokenType.REFRESH);
      await tokenService.saveToken(refreshToken, dbUserOne.id, refreshTokenExpires, TokenType.REFRESH);

      await request(app)
        .post('/api/auth/logout')
        .send({ refreshToken })
        .expect(httpStatus.NO_CONTENT);

      const dbRefreshTokenData = await prisma.token.findFirst({ where: { token: refreshToken } });
      expect(dbRefreshTokenData).toBe(null);
    });

    test('should return 400 error if refresh token is missing from request body', async () => {
      await request(app).post('/api/auth/logout').send().expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if refresh token is not found in the database', async () => {
      await insertUsers([userOne]);
      const dbUserOne = (await prisma.user.findUnique({ where: { email: userOne.email } })) as User;
      const refreshExpirationDays = +(process.env.JWT_REFRESH_EXPIRATION_DAYS ?? 30);
      const refreshTokenExpires = new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000); // to days
      const refreshToken = tokenService.generateToken(dbUserOne.id, refreshTokenExpires, TokenType.REFRESH);

      await request(app)
        .post('/api/auth/logout')
        .send({ refreshToken })
        .expect(httpStatus.NOT_FOUND);
    });

    test('should return 404 error if refresh token is blacklisted', async () => {
      await insertUsers([userOne]);
      const dbUserOne = (await prisma.user.findUnique({ where: { email: userOne.email } })) as User;
      const refreshExpirationDays = +(process.env.JWT_REFRESH_EXPIRATION_DAYS ?? 30);
      const refreshTokenExpires = new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000); // to days
      const refreshToken = tokenService.generateToken(dbUserOne.id, refreshTokenExpires, TokenType.REFRESH);
      await tokenService.saveToken(refreshToken, dbUserOne.id, refreshTokenExpires, TokenType.REFRESH, true);

      await request(app)
        .post('/api/auth/logout')
        .send({ refreshToken })
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('POST /api/auth/refresh-tokens', () => {
    test('should return 200 and new auth tokens if refresh token is valid', async () => {
      await insertUsers([userOne]);
      const dbUserOne = (await prisma.user.findUnique({ where: { email: userOne.email } })) as User;
      const refreshExpirationDays = +(process.env.JWT_REFRESH_EXPIRATION_DAYS ?? 30);
      const refreshTokenExpires = new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000); // to days
      const refreshToken = tokenService.generateToken(dbUserOne.id, refreshTokenExpires, TokenType.REFRESH);
      await tokenService.saveToken(refreshToken, dbUserOne.id, refreshTokenExpires, TokenType.REFRESH);

      const res = await request(app)
        .post('/api/auth/refresh-tokens')
        .send({ refreshToken })
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() }
      });

      const dbRefreshTokenData = await prisma.token.findFirst({
        where: { token: res.body.refresh.token },
        select: {
          type: true,
          userId: true,
          blacklisted: true
        }
      });
      expect(dbRefreshTokenData).toMatchObject({
        type: TokenType.REFRESH,
        userId: dbUserOne.id,
        blacklisted: false
      });

      const dbRefreshTokenCount = await prisma.token.count();
      expect(dbRefreshTokenCount).toBe(1);
    });

    test('should return 400 error if refresh token is missing from request body', async () => {
      await request(app).post('/api/auth/refresh-tokens').send().expect(httpStatus.BAD_REQUEST);
    });

    test('should return 401 error if refresh token is signed using an invalid secret', async () => {
      await insertUsers([userOne]);
      const dbUserOne = (await prisma.user.findUnique({ where: { email: userOne.email } })) as User;
      const refreshExpirationDays = +(process.env.JWT_REFRESH_EXPIRATION_DAYS ?? 30);
      const refreshTokenExpires = new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000); // to days
      const refreshToken = tokenService.generateToken(
        dbUserOne.id,
        refreshTokenExpires,
        TokenType.REFRESH,
        'invalidSecret'
      );
      await tokenService.saveToken(refreshToken, dbUserOne.id, refreshTokenExpires, TokenType.REFRESH);

      await request(app)
        .post('/api/auth/refresh-tokens')
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 401 error if refresh token is not found in the database', async () => {
      await insertUsers([userOne]);
      const dbUserOne = (await prisma.user.findUnique({ where: { email: userOne.email } })) as User;
      const refreshExpirationDays = +(process.env.JWT_REFRESH_EXPIRATION_DAYS ?? 30);
      const refreshTokenExpires = new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000); // to days
      const refreshToken = tokenService.generateToken(dbUserOne.id, refreshTokenExpires, TokenType.REFRESH);

      await request(app)
        .post('/api/auth/refresh-tokens')
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 401 error if refresh token is blacklisted', async () => {
      await insertUsers([userOne]);
      const dbUserOne = (await prisma.user.findUnique({ where: { email: userOne.email } })) as User;
      const refreshExpirationDays = +(process.env.JWT_REFRESH_EXPIRATION_DAYS ?? 30);
      const refreshTokenExpires = new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000); // to days
      const refreshToken = tokenService.generateToken(dbUserOne.id, refreshTokenExpires, TokenType.REFRESH);
      await tokenService.saveToken(refreshToken, dbUserOne.id, refreshTokenExpires, TokenType.REFRESH, true);

      await request(app)
        .post('/api/auth/refresh-tokens')
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 401 error if refresh token is expired', async () => {
      await insertUsers([userOne]);
      const dbUserOne = (await prisma.user.findUnique({ where: { email: userOne.email } })) as User;
      const expires = new Date(Date.now() - 60 * 1000); // to days
      const refreshToken = tokenService.generateToken(dbUserOne.id, expires, TokenType.REFRESH);
      await tokenService.saveToken(refreshToken, dbUserOne.id, expires, TokenType.REFRESH);

      await request(app)
        .post('/api/auth/refresh-tokens')
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });
  });
});