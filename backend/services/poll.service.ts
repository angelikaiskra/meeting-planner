import prisma from '../client';
import { QueryResult } from '../types/utils.interface';
import { MeetingPoll, MeetingPollOption, User, Vote, VoteType } from '@prisma/client';
import { MeetingPollSettings, MeetingTime } from '../types/poll.interface';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

/**
 * Create a meeting poll
 * @returns {Promise<MeetingPoll>}
 * @param title
 * @param description
 * @param timezone
 * @param options
 * @param settings
 * @param user
 */
const createMeetingPoll = async (
  title: string,
  description: string,
  timezone: string,
  options: MeetingTime[],
  settings: MeetingPollSettings,
  user: User | null
): Promise<MeetingPoll> => {
  const userInfo = user
    ? {
        userId: user.id,
        ownerUuid: user.uuid
      }
    : null;

  return prisma.meetingPoll.create({
    data: {
      title,
      description,
      timezone,
      options: {
        create: options
      },
      settings: {
        create: settings
      },
      ...(userInfo && {
        user: {
          connect: {
            id: userInfo.userId
          }
        },
        ownerUuid: userInfo.ownerUuid
      })
    },
    include: {
      options: {
        include: {
          votes: true
        }
      },
      settings: true,
    }
  });
};

/**
 * Query for meeting polls
 * @param {string} ownerUuid
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult<MeetingPoll>>}
 */
const queryMeetingPolls = async (
  ownerUuid: string,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  }
): Promise<QueryResult<MeetingPoll>> => {
  const page = options.page ? +options.page : 1;
  const limit = options.limit ? +options.limit : 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';

  const offset = limit * (page - 1);

  const polls = await prisma.meetingPoll.findMany({
    skip: offset,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
    where: { ownerUuid }
  });

  const total = await prisma.meetingPoll.count({
    where: { ownerUuid }
  });
  return { data: polls, total, page, limit };
};

/**
 * Get meeting poll by id
 * @param {number} pollId
 * @param {string} ownerUuid
 * @returns {Promise<MeetingPoll>}
 */
const getMeetingPollById = async (
  pollId: number,
  ownerUuid?: string
): Promise<MeetingPoll | null> => {
  return prisma.meetingPoll.findUnique({
    where: {
      id: pollId,
      ...(ownerUuid && { ownerUuid: ownerUuid })
    },
    include: {
      options: {
        include: {
          votes: true
        }
      },
      settings: true,
    }
  });
};

/**
 * Update meeting poll by id
 * @param {number} pollId
 * @param {string} ownerUuid
 * @param {Object} data
 * @returns {Promise<MeetingPoll>}
 */
// TODO: Add type for data
const updateMeetingPoll = async (
  pollId: number,
  data: Partial<MeetingPoll>,
  ownerUuid?: string
): Promise<MeetingPoll> => {
  const meetingPoll = await getMeetingPollById(pollId, ownerUuid);
  if (!meetingPoll) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meeting poll not found');
  }

  return prisma.meetingPoll.update({
    where: {
      id: pollId
    },
    data
  });
};

/**
 * Delete meeting poll by id
 * @param {number} pollId
 * @param {string} ownerUuid
 * @returns {Promise<void>}
 */
const deleteMeetingPollById = async (pollId: number, ownerUuid?: string): Promise<void> => {
  const meetingPoll = await getMeetingPollById(pollId, ownerUuid);
  if (!meetingPoll) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meeting poll not found');
  }

  await prisma.meetingPoll.delete({
    where: {
      id: pollId
    }
  });
};

/**
 * Add a vote to meeting poll
 * @returns {Promise<MeetingPollOption>}
 */
const addUserVote = async (
  pollOptionId: number,
  userInfo: {
    isGuest: boolean;
    guestUuid?: string;
    guestName?: string;
    userId?: number;
  },
  vote: VoteType
): Promise<MeetingPollOption> => {
  const pollOption = await getPollOptionById(pollOptionId);
  if (!pollOption) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meeting option not found');
  }

  return prisma.meetingPollOption.update({
    where: { id: pollOptionId },
    data: {
      votes: {
        create: {
          vote,
          ...userInfo.isGuest ?
            {guestUuid: userInfo.guestUuid, guestName: userInfo.guestName} :
            {userId: userInfo.userId}
        }
      }
    },
    include: {
      votes: true
    }
  });
};

/**
 * Get a poll option by its ID and optionally by filters such as guest UUID or user ID.
 *
 * @param {number} optionId - The ID of the poll option to retrieve.
 * @returns {Promise<MeetingPollOption | null>} - The poll option with the specified ID and filters, or null if not found.
 */
const getPollOptionById = async (optionId: number): Promise<MeetingPollOption | null> => {
  return prisma.meetingPollOption.findUnique({
    where: {
      id: optionId,
    },
    include: {
      votes: true
    }
  });
}

export default {
  createMeetingPoll,
  queryMeetingPolls,
  getMeetingPollById,
  updateMeetingPoll,
  deleteMeetingPollById,
  addUserVote
};
