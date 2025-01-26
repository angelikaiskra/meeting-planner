import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validate =
  (schema: Partial<Record<'params' | 'query' | 'body', Joi.Schema>>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validationData: Partial<Record<'params' | 'query' | 'body', any>> = {};

    (['params', 'query', 'body'] as const).forEach((key) => {
      if (schema[key]) {
        validationData[key] = req[key];
      }
    });

    const { value, error } = Joi.object(schema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(validationData);

    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);
    return next();
  };

export default validate;
