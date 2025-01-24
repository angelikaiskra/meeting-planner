import express from 'express';
import pollController from '../controllers/poll.controller';
import { guestAuth } from '../middlewares/auth';

const router = express.Router();

router.route('/')
  .post(guestAuth(), pollController.createMeetingPoll)
  .get(guestAuth(), pollController.queryMeetingPolls);

router.route('/:pollId/:uuid?')
  .get(guestAuth(), pollController.getMeetingPoll)
  .patch(guestAuth(), pollController.updateMeetingPoll)
  .delete(guestAuth(), pollController.deleteMeetingPoll);

router.route('/:pollId/vote/:uuid?')
  .post(guestAuth(), pollController.addVoteToMeetingPoll)
  // .patch(guestAuth(), pollController.editVoteInMeetingPoll);

export default router;