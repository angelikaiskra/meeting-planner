import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: User) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ message: 'Unauthorized' });
    req.user = user;
    next();
  })(req, res, next);
};

export default auth;
