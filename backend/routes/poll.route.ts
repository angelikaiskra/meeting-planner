import express from 'express';
import pollController from '../controllers/poll.controller';

const router = express.Router();

router.route('/')
  .post(pollController.createMeetingPoll)
  .get(pollController.queryMeetingPolls);

router.route('/:pollId')
  .get(pollController.getMeetingPoll)
  .patch(pollController.updateMeetingPoll)
  .delete(pollController.deleteMeetingPoll);

export default router;