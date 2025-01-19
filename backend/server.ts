// Entry point of the backend server
import express from 'express';
import httpStatus from 'http-status';
import cors from 'cors';

import ApiError from './utils/ApiError';
import errorHandler from './middlewares/error';
import { rateLimiter } from './middlewares/rateLimiter';
import routes from './routes';

const PORT = process.env.PORT || 3001;
const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// limit requests
app.use(rateLimiter);

// Routes and middleware
app.use('/api', routes);

// Test route to check connection to database
// app.get('/', async (req: express.Request, res: express.Response, next: NextFunction) => {
  // try {
  //   await prisma.$queryRaw`SELECT 1`;
  //   res.status(200).json({ message: 'Database connection is successful' });
  // } catch (err: unknown) {
  //   console.error(err);
  //   res.status(500).json({ success: false, error: err });
  // }
// });

// send back a 404 error for unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// handle error
app.use(errorHandler);

// start express server
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT} 🚀`);
});

export { app };
