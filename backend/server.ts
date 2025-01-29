// Entry point of the backend server
import express from 'express';
import httpStatus from 'http-status';
import cors from 'cors';
import passport from 'passport';

import ApiError from './utils/ApiError';
import errorHandler from './middlewares/error';
import { rateLimiter } from './middlewares/rateLimiter';
import routes from './routes';
import jwtStrategy from './config/passport';

const PORT = process.env.PORT || 3001;
const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit requests
if (process.env.NODE_ENV !== 'test') {
  app.use(rateLimiter);
}

// Routes and middleware
app.use('/api', routes);

// send back a 404 error for unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// handle error
app.use(errorHandler);

// start express server
// do not explicitly listen on a port when running tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is up and running at http://localhost:${PORT} 🚀`);
  });
}

export { app };
