import express from 'express';
import pollRoute from './poll.route';
import userRoute from './user.route';

const router = express.Router();

router.use('/polls', pollRoute);
router.use('/users', userRoute);

export default router;