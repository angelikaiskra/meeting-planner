import express from 'express';
import pollController from '../controllers/poll.controller';
import { guestAuth } from '../middlewares/auth';
import validate from '../middlewares/validate';
import pollValidation from '../validations/poll.validation';

const router = express.Router();

router.route('/')
  .post(guestAuth(), validate(pollValidation.createMeetingPoll), pollController.createMeetingPoll)
  .get(guestAuth(), validate(pollValidation.queryMeetingPolls), pollController.queryMeetingPolls);

router.route('/:pollId/:uuid?')
  .get(guestAuth(), validate(pollValidation.getMeetingPoll), pollController.getMeetingPoll)
  .patch(guestAuth(), validate(pollValidation.updateMeetingPoll), pollController.updateMeetingPoll)
  .delete(guestAuth(), validate(pollValidation.deleteMeetingPoll), pollController.deleteMeetingPoll);

router.route('/:pollId/vote/:uuid?')
  .post(guestAuth(), validate(pollValidation.addVoteToMeetingPoll), pollController.addVoteToMeetingPoll)
  // .patch(guestAuth(), pollController.editVoteInMeetingPoll);

export default router;