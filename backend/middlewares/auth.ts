import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

const auth = async (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate(
        'jwt',
        { session: false }
      )(req, res, next)
      .then(() => next())
      .catch((err: any) => next(err));
  };

export default auth;
