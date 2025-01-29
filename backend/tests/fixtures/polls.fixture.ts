import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import prisma from '../../client';
import { PollWithOptionsAndSettings } from '../../types/poll.interface';

export const pollOne: Prisma.MeetingPollCreateInput = {
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  timezone: 'Europe/Warsaw',
  options: {
    create: [
      {
        type: 'TIME_RANGE',
        startTime: '2025-01-14T00:00:00.000Z',
        endTime: '2025-01-14T23:59:59.999Z'
      },
      {
        type: 'DATE',
        date: '2025-01-14'
      }
    ]
  },
  settings: {
    create: {
      allowOnlyOneVote: false,
      allowMaybeAnswer: true,
      hideOthersAnswers: false,
      voteDeadline: '2025-02-14T12:00:00.000Z'
    }
  }
};

export const insertPoll = async (poll: Prisma.MeetingPollCreateInput): Promise<PollWithOptionsAndSettings> => {
  return prisma.meetingPoll.create({
    data: poll,
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

export const insertPolls = async (polls: Prisma.MeetingPollCreateManyInput[]) => {
  await prisma.meetingPoll.createMany({
    data: polls.map((poll) => ({ ...poll }))
  });
};