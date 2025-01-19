import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';

import ApiError from "../utils/ApiError";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (!(err instanceof ApiError)) {
        const statusCode = err.statusCode ||
            (err instanceof Prisma.PrismaClientKnownRequestError
                ? httpStatus.BAD_REQUEST
                : httpStatus.INTERNAL_SERVER_ERROR);
        const message = err.message || httpStatus[statusCode as keyof typeof httpStatus];
        err = new ApiError(statusCode, message, err.stack);
    }

    const response = {
        statusCode: err.statusCode,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    res.status(err.statusCode).send(response);
}

export default errorHandler;