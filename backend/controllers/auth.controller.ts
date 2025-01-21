import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';
import tokenService from '../services/token.service';
import authService from '../services/auth.service';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { id, name } = await userService.createUser(email, password);
    const tokens = await tokenService.generateAuthTokens(id as number);

    res.status(httpStatus.CREATED).send({ user: { id, email, name }, tokens });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user.id);
    res.send({ user, tokens });
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();

  } catch (error) {
    next(error);
  }
};

const refreshTokens = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });

  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  logout,
  refreshTokens
};
