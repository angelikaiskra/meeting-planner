import { User, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

import { QueryResult } from '../types/utils.interface';
import ApiError from '../utils/ApiError';
import prisma from '../client';

/**
 * Creates a new user with the given email, password, and optional name.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {string} [name] - The optional name of the user.
 * @returns {Promise<Partial<User>>} The created user.
 * @throws {ApiError} If the email is already taken.
 */
const createUser = async (email: string, password: string, name?: string): Promise<Partial<User>> => {
  if (await getUserByEmail(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
  }

  const encryptedPassword = await bcrypt.hash(password, 8);

  return prisma.user.create({
    data: {
      email,
      name,
      password: encryptedPassword
    },
    select: {
      id: true,
      uuid: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

/**
 * Queries users with pagination and sorting options.
 * @param {Object} options - The query options.
 * @param {number} [options.limit=10] - The number of users to return.
 * @param {number} [options.page=1] - The page number to return.
 * @param {string} [options.sortBy] - The field to sort by.
 * @param {'asc' | 'desc'} [options.sortType='desc'] - The sort direction.
 * @returns {Promise<QueryResult<Partial<User>>>} The query result containing users and pagination info.
 */
const queryUsers = async (options: {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortType?: 'asc' | 'desc';
}): Promise<QueryResult<Partial<User>>> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';

  const offset = limit * (page - 1);

  const users = await prisma.user.findMany({
    skip: offset,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
    select: {
      id: true,
      uuid: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true
    }
  });

  const total = await prisma.user.count();
  return {
    data: users,
    total,
    page,
    limit
  };
};

/**
 * Retrieves a user by their ID.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Partial<User> | null>} The user if found, otherwise null.
 */
const getUserById = async (userId: number): Promise<Partial<User> | null> => {
  return prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      uuid: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

/**
 * Retrieves a user by their email.
 * @param {string} email - The email of the user.
 * @returns {Promise<User | null>} The user if found, otherwise null.
 */
const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      email: email
    }
  });
};

/**
 * Updates a user with the given ID and update data.
 * @param {number} userId - The ID of the user to update.
 * @param {Prisma.UserUpdateInput} updateBody - The update data.
 * @returns {Promise<Partial<User>>} The updated user.
 * @throws {ApiError} If the user is not found or the email is already taken.
 */
const updateUser = async (userId: number, updateBody: Prisma.UserUpdateInput): Promise<Partial<User>> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (updateBody.email && (await getUserByEmail(updateBody.email as string))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  return prisma.user.update({
    where: {
      id: userId
    },
    select: {
      id: true,
      uuid: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true
    },
    data: updateBody
  });
};

/**
 * Deletes a user by their ID.
 * @param {number} userId - The ID of the user to delete.
 * @returns {Promise<Partial<User>>} The deleted user.
 * @throws {ApiError} If the user is not found.
 */
const deleteUser = async (userId: number): Promise<Partial<User>> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  await prisma.user.delete({
    where: {
      id: user.id
    }
  });
  return user;
};

export default {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser
};
