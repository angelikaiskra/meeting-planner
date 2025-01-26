import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import pollService from '../services/poll.service';
import ApiError from '../utils/ApiError';
import { User } from '@prisma/client';

const createMeetingPoll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, timezone, options, settings } = req.body;
    const user = req.user as User || null;

    const poll = await pollService.createMeetingPoll(title, description, timezone, options, settings, user);
    const isGuest = !poll.userId;
    const response = {
      poll,
      isGuest: isGuest,
      ...(isGuest && { guestUuid: poll.ownerUuid }),
    };

    res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    next(error);
  }
};

const queryMeetingPolls = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const options = req.query;
    const user = req.user as User || null;
    const ownerUuid =  user ? user.uuid : req.query.uuid as string;

    if (!ownerUuid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You need to log in or send your guest UUID in order to query polls');
    }

    const meetingPolls = await pollService.queryMeetingPolls(ownerUuid, options);
    res.send(meetingPolls);
  } catch (error) {
    next(error);
  }
};

const getMeetingPoll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User || null;
    const ownerUuid =  user ? user.uuid : req.params.uuid as string;

    if (!ownerUuid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You don\'t have access to this poll');
    }

    const meetingPoll = await pollService.getMeetingPollById(+req.params.pollId, ownerUuid);

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
    const user = req.user as User || null;
    const ownerUuid =  user ? user.uuid : req.params.uuid;

    if (!ownerUuid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You don\'t have access to this poll');
    }

    const { uuid, ...body } = req.body;

    const updatedMeetingPoll = await pollService.updateMeetingPoll(+req.params.pollId, body, ownerUuid);
    res.send(updatedMeetingPoll);
  } catch (error) {
    next(error);
  }
};

const deleteMeetingPoll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User || null;
    const ownerUuid =  user ? user.uuid : req.params.uuid as string;

    if (!ownerUuid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You don\'t have access to this poll');
    }

    await pollService.deleteMeetingPollById(+req.params.pollId, ownerUuid);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

const addVoteToMeetingPoll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User || null;
    const ownerUuid =  user ? user.uuid : req.params.uuid as string;

    if (!ownerUuid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You don\'t have access to this poll');
    }

    const meetingPoll = await pollService.getMeetingPollById(+req.params.pollId, ownerUuid);

    if (!meetingPoll) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Meeting poll not found');
    }

    const { optionId, vote } = req.body;
    const userInfo = {
      isGuest: !user,
      ...user ? { userId: user.id } : { guestUuid: ownerUuid, guestName: req.body.name },
    };

    const updatedPoll = await pollService.addUserVote(optionId, userInfo, vote);
    res.status(httpStatus.OK).send(updatedPoll);

  } catch (error) {
    next(error);
  }
};


export default {
  createMeetingPoll,
  queryMeetingPolls,
  getMeetingPoll,
  updateMeetingPoll,
  deleteMeetingPoll,
  addVoteToMeetingPoll
};
