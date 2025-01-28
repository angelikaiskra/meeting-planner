import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import { User } from '@prisma/client';
import { describe, beforeEach, test, expect, jest } from '@jest/globals';

import setupTestDB from '../utils/setupTestDb';
import { app } from '../../server';
import prisma from '../../client';
import { CreateMeetingPollRequest } from '../../types/poll.interface';

setupTestDB();

describe('Poll routes', () => {
  describe('POST /api/polls', () => {
    let newPoll: CreateMeetingPollRequest;

    beforeEach(() => {
      newPoll = {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        timezone: 'Europe/Warsaw',
        options: [
          {
            type: 'TIME_RANGE',
            startTime: '2025-01-14T00:00:00.000Z',
            endTime: '2025-01-14T23:59:59.999Z'
          },
          {
            type: 'DATE',
            date: '2025-01-14'
          }
        ],
        settings: {
          allowOnlyOneVote: false,
          allowMaybeAnswer: true,
          hideOthersAnswers: false,
          voteDeadline: '2025-02-14T12:00:00.000Z'
        }
      };
    });

    test('should create a new meeting poll for a guest user', async () => {
      const res = await request(app)
        .post('/api/polls')
        .send(newPoll)
        .expect(httpStatus.CREATED);

      expect(res.body).toHaveProperty("poll");
      expect(res.body.poll.title).toBe(newPoll.title)
      expect(res.body.isGuest).toBe(true);
      expect(res.body).toHaveProperty("guestUuid");

      const dbPoll = await prisma.meetingPoll.findUnique({ where: { id: res.body.poll.id } });
      expect(dbPoll).toBeDefined();
      expect(dbPoll?.title).toBe(newPoll.title);
    });
    
  });
});
