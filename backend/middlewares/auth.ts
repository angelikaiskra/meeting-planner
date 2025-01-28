import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';

const authenticate = (allowGuest = false) => async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: User) => {
    if (err) return next(err);
    if (!user && !allowGuest) return res.status(401).json({ message: 'Unauthorized' });
    req.user = user;
    next();
  })(req, res, next);
};
const auth = () => authenticate();

const guestAuth = () => authenticate(true);

export { auth, guestAuth };