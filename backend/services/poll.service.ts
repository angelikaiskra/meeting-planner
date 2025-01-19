import prisma from '../client';
// import ApiError from '../utils/ApiError';
import { QueryResult } from '../types/utils.interface';
import { MeetingPoll } from '@prisma/client';
import { MeetingPollSettings, MeetingTime } from '../types/poll.interface';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

/**
 * Create a meeting poll
 * @returns {Promise<MeetingPoll>}
 * @param title
 * @param description
 * @param proposedTimes
 * @param settings
 */
const createMeetingPoll = async (
  title: string,
  description: string,
  proposedTimes: MeetingTime[],
  settings: MeetingPollSettings
): Promise<MeetingPoll> => {
  return prisma.meetingPoll.create({
    data: {
      title,
      description,
      proposedTimes: {
        create: proposedTimes
      },
      settings: {
        create: settings
      }
    }
  });
};

/**
 * Query for meeting polls
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult<MeetingPoll>>}
 */
const queryMeetingPolls = async (options: {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortType?: 'asc' | 'desc';
}): Promise<QueryResult<MeetingPoll>> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';

  const offset = limit * (page - 1);

  const polls = await prisma.meetingPoll.findMany({
    skip: offset,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });

  const total = await prisma.meetingPoll.count();
  return { data: polls, total, page, limit };
};

/**
 * Get meeting poll by id
 * @param {number} pollId
 * @returns {Promise<MeetingPoll>}
 */
const getMeetingPollById = async (pollId: number): Promise<MeetingPoll | null> => {
  return prisma.meetingPoll.findUnique({
    where: {
      id: pollId
    }
  });
}

/**
 * Update meeting poll by id
 * @param {number} pollId
 * @param {Object} data
 * @returns {Promise<MeetingPoll>}
 */
// TODO: Add type for data
const updateMeetingPollById = async (pollId: number, data: any): Promise<MeetingPoll> => {
  const meetingPoll = await getMeetingPollById(pollId);
  if (!meetingPoll) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meeting poll not found');
  }

  return prisma.meetingPoll.update({
    where: {
      id: pollId
    },
    data
  });
}

/**
 * Delete meeting poll by id
 * @param {number} pollId
 * @returns {Promise<void>}
 */
const deleteMeetingPollById = async (pollId: number): Promise<void> => {
  const meetingPoll = await getMeetingPollById(pollId);
  console.log("meetingPoll", meetingPoll);
  if (!meetingPoll) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meeting poll not found');
  }
  console.log("throw new ApiError");

  await prisma.meetingPoll.delete({
    where: {
      id: pollId
    }
  });
}

export default {
  createMeetingPoll,
  queryMeetingPolls,
  getMeetingPollById,
  updateMeetingPollById,
  deleteMeetingPollById
};
