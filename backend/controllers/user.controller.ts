import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import userService from '../services/user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    const user = await userService.createUser(email, password, name);
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const options = req.query;
    const result = await userService.queryUsers(options);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(+req.params.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);

  }  catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await userService.updateUser(+req.params.userId, req.body);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.deleteUser(+req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
