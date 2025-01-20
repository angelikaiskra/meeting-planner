import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import pollService from '../services/poll.service';
import ApiError from '../utils/ApiError';

const createMeetingPoll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, timezone, options, settings } = req.body;
    const poll = await pollService.createMeetingPoll(title, description, timezone, options, settings);
    res.status(httpStatus.CREATED).send(poll);
  } catch (error) {
    next(error);
  }
};

const queryMeetingPolls = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const options = req.query;
    const result = await pollService.queryMeetingPolls(options);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getMeetingPoll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meetingPoll = await pollService.getMeetingPollById(+req.params.pollId);
    if (!meetingPoll) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Meeting poll not found');
    }
    res.send(meetingPoll);

  }  catch (error) {
    next(error);
  }
};

const updateMeetingPoll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedMeetingPoll = await pollService.updateMeetingPoll(+req.params.pollId, req.body);
    res.send(updatedMeetingPoll);
  } catch (error) {
    next(error);
  }
};

const deleteMeetingPoll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await pollService.deleteMeetingPollById(+req.params.pollId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export default {
  createMeetingPoll,
  queryMeetingPolls,
  getMeetingPoll,
  updateMeetingPoll,
  deleteMeetingPoll
};
