import express from 'express';
import pollRoute from './poll.route';

const router = express.Router();

router.use('/polls', pollRoute);

export default router;