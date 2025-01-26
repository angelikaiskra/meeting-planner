import express from 'express';
import pollRoute from './poll.route';
import authRoute from './auth.route';

const router = express.Router();

router.use('/polls', pollRoute);
router.use('/auth', authRoute);

export default router;