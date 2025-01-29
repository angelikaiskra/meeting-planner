import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import { describe, beforeEach, test, expect, jest } from '@jest/globals';

import setupTestDB from '../utils/setupTestDb';
import { app } from '../../server';
import prisma from '../../client';
import { CreateMeetingPollRequest, PollWithOptionsAndSettings } from '../../types/poll.interface';
import { insertPoll, pollOne } from '../fixtures/polls.fixture';
import { createAndLoginUserOne } from '../utils/userUtils';

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
      const res = await request(app).post('/api/polls').send(newPoll).expect(httpStatus.CREATED);

      expect(res.body).toHaveProperty('poll');
      expect(res.body.poll.title).toBe(newPoll.title);
      expect(res.body.isGuest).toBe(true);
      expect(res.body).toHaveProperty('guestUuid');

      const dbPoll = await prisma.meetingPoll.findUnique({ where: { id: res.body.poll.id } });
      expect(dbPoll).toBeDefined();
      expect(dbPoll?.title).toBe(newPoll.title);
    });

    test('should create a new meeting poll for a logged in user', async () => {
      const { accessToken } = await createAndLoginUserOne();

      const res = await request(app)
        .post('/api/polls')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(newPoll)
        .expect(httpStatus.CREATED);

      expect(res.body).toHaveProperty('poll');
      expect(res.body.poll.title).toBe(newPoll.title);
      expect(res.body.isGuest).toBe(false);
      expect(res.body).not.toHaveProperty('guestUuid');

      const dbPoll = await prisma.meetingPoll.findUnique({ where: { id: res.body.poll.id } });
      expect(dbPoll).toBeDefined();
      expect(dbPoll?.title).toBe(newPoll.title);
    });

    test('should return 400 if there are no options in a poll', async () => {
      const pollWithZeroOptions = {
        ...newPoll,
        options: []
      }
      await request(app).post('/api/polls').send(pollWithZeroOptions).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if the required title is not provided', async () => {
      let pollWithNoTitle: Partial<CreateMeetingPollRequest> = { ...newPoll };
      delete pollWithNoTitle.title;

      await request(app).post('/api/polls').send(pollWithNoTitle).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /api/polls', () => {
    test('should fetch all meeting polls for a guest user if uuid is correct', async () => {
      const dbPollOne = await insertPoll(pollOne);
      const guestUuid = dbPollOne.ownerUuid;

      const res = await request(app)
        .get('/api/polls?uuid=' + guestUuid)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty('data');
      expect(res.body?.data).toHaveLength(1);
    });

    test('should fetch all meeting polls for a logged in user', async () => {
      const { user, accessToken } = await createAndLoginUserOne();
      const pollWithOwner = {
        ...pollOne,
        ownerUuid: user.uuid
      }
      await insertPoll(pollWithOwner as Prisma.MeetingPollCreateInput);

      const res = await request(app)
        .get('/api/polls')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty('data');
      expect(res.body?.data).toHaveLength(1);
    });

    test('should return 401 if user is a guest and uuid is missing from params', async () => {
      const res = await request(app)
        .get('/api/polls')
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        message: expect.anything()
      });
    });

    test('should return empty array if user is a guest and uuid doesnt match any poll in db', async () => {
      const randomGuestUuid = "c37b9670-09c5-484e-9471-688540a1dc51";
      const res = await request(app)
        .get('/api/polls?uuid=' + randomGuestUuid)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty('data');
      expect(res.body?.data).toHaveLength(0);
    });
  });

  describe('GET /:pollId/', () => {
    test('should return meeting poll for correct pollId and guestUuid', async () => {
      const dbPollOne = await insertPoll(pollOne);
      const guestUuid = dbPollOne.ownerUuid;

      const res = await request(app)
        .get(`/api/polls/${dbPollOne.id}/${guestUuid}`)
        .expect(httpStatus.OK);

      expect(res.body.title).toBe(dbPollOne.title);
    });

    test('should return meeting poll for correct pollId and logged in user', async () => {
      const { user, accessToken } = await createAndLoginUserOne();
      const pollWithOwner = {
        ...pollOne,
        ownerUuid: user.uuid
      }
      const dbPollOne = await insertPoll(pollWithOwner as Prisma.MeetingPollCreateInput);

      const res = await request(app)
        .get('/api/polls/' + dbPollOne.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(httpStatus.OK);

      expect(res.body.title).toBe(dbPollOne.title);
    });

    test('should return 404 if guest user is not the owner of the poll', async () => {
      const dbPollOne = await insertPoll(pollOne);
      const randomGuestUuid = "4c687925-568a-4e10-af56-0fbd8082bacc";

      const res = await request(app)
        .get(`/api/polls/${dbPollOne.id}/${randomGuestUuid}`)
        .expect(httpStatus.NOT_FOUND);

      expect(res.body).toEqual({
        statusCode: httpStatus.NOT_FOUND,
        message: expect.anything()
      });
    });

    test('should return 404 if logged in user is not the owner of the poll', async () => {
      const { accessToken } = await createAndLoginUserOne();
      const dbPollOne = await insertPoll(pollOne);

      const res = await request(app)
        .get(`/api/polls/${dbPollOne.id}/`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(httpStatus.NOT_FOUND);

      expect(res.body).toEqual({
        statusCode: httpStatus.NOT_FOUND,
        message: expect.anything()
      });
    });

    test('should return 404 if guest uuid is missing from params', async () => {
      const dbPollOne = await insertPoll(pollOne);

      const res = await request(app)
        .get(`/api/polls/${dbPollOne.id}/`)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        message: expect.anything()
      });
    });
  });

  describe('PATCH /:pollId/', () => {
    let updateData: Partial<CreateMeetingPollRequest>;

    beforeEach(() => {
      updateData = {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          settings: {
            allowOnlyOneVote: true,
            allowMaybeAnswer: false,
            hideOthersAnswers: true,
            voteDeadline: '2025-03-14T12:00:00.000Z'
          }
      };
    });

    test('should update a meeting poll for the poll owner (logged in user)', async () => {
      const { user, accessToken } = await createAndLoginUserOne();
      const pollWithOwner = { ...pollOne, ownerUuid: user.uuid };
      const dbPoll = await insertPoll(pollWithOwner as Prisma.MeetingPollCreateInput);

      const res = await request(app)
        .patch(`/api/polls/${dbPoll.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateData)
        .expect(httpStatus.OK);

      expect(res.body.title).toBe(updateData.title);
      expect(res.body.description).toBe(updateData.description);
    });

    test('should update a meeting poll for a guest user with correct guestUuid', async () => {
      const dbPoll = await insertPoll(pollOne);
      const guestUuid = dbPoll.ownerUuid;

      const res = await request(app)
        .patch(`/api/polls/${dbPoll.id}/${guestUuid}`)
        .send(updateData)
        .expect(httpStatus.OK);

      expect(res.body.title).toBe(updateData.title);
      expect(res.body.description).toBe(updateData.description);
    });

    test('should return 404 if a logged in user is not the owner of the poll', async () => {
      const { accessToken } = await createAndLoginUserOne();
      const dbPoll = await insertPoll(pollOne);

      await request(app)
        .patch(`/api/polls/${dbPoll.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateData)
        .expect(httpStatus.NOT_FOUND);
    });

    test('should return 404 if guest user is not the owner of the poll', async () => {
      const dbPoll = await insertPoll(pollOne);
      const randomGuestUuid = '4c687925-568a-4e10-af56-0fbd8082bacc';

      await request(app)
        .patch(`/api/polls/${dbPoll.id}/${randomGuestUuid}`)
        .send(updateData)
        .expect(httpStatus.NOT_FOUND);
    });

    test('should return 400 if no valid fields are provided for update', async () => {
      const { user, accessToken } = await createAndLoginUserOne();
      const pollWithOwner = { ...pollOne, ownerUuid: user.uuid };
      const dbPoll = await insertPoll(pollWithOwner as Prisma.MeetingPollCreateInput);

      await request(app)
        .patch(`/api/polls/${dbPoll.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('DELETE /api/polls/:pollId', () => {
    test('should delete a meeting poll for the poll owner (logged in user)', async () => {
      const { user, accessToken } = await createAndLoginUserOne();
      const pollWithOwner = { ...pollOne, ownerUuid: user.uuid };
      const dbPoll = await insertPoll(pollWithOwner as Prisma.MeetingPollCreateInput);

      await request(app)
        .delete(`/api/polls/${dbPoll.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(httpStatus.NO_CONTENT);
    });

    test('should return 404 if a logged in user is not the owner of the poll', async () => {
      const { accessToken } = await createAndLoginUserOne();
      const dbPoll = await insertPoll(pollOne);

      await request(app)
        .delete(`/api/polls/${dbPoll.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });

    test('should delete a meeting poll for a guest user with correct guestUuid', async () => {
      const dbPoll = await insertPoll(pollOne);
      const guestUuid = dbPoll.ownerUuid;

      await request(app)
        .delete(`/api/polls/${dbPoll.id}/${guestUuid}`)
        .expect(httpStatus.NO_CONTENT);
    });

    test('should return 404 if guest user is not the owner of the poll', async () => {
      const dbPoll = await insertPoll(pollOne);
      const randomGuestUuid = '4c687925-568a-4e10-af56-0fbd8082bacc';

      await request(app)
        .delete(`/api/polls/${dbPoll.id}/${randomGuestUuid}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('POST /api/polls/:pollId/vote', () => {
    let dbPoll: PollWithOptionsAndSettings;

    beforeEach(async () => {
      dbPoll = await insertPoll(pollOne);
    });

    test('should add a vote to a meeting poll for a guest user', async () => {
      const guestUuid = "47b82420-3d6b-4707-9594-e96997584d24";
      const voteData = {
        optionId: dbPoll.options[0].id,
        vote: "YES",
        name: 'Guest User'
      };

      const res = await request(app)
        .post(`/api/polls/${dbPoll.id}/vote/${guestUuid}`)
        .send(voteData)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty('id');
      expect(res.body.votes).toHaveLength(1);
      expect(res.body.votes[0].guestUuid).toBe(guestUuid);
    });

    test('should add a vote to a meeting poll for a logged in user', async () => {
      const { accessToken, user } = await createAndLoginUserOne();
      const voteData = {
        optionId: dbPoll.options[0].id,
        vote: "YES"
      };

      const res = await request(app)
        .post(`/api/polls/${dbPoll.id}/vote`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(voteData)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty('id');
      expect(res.body.votes).toHaveLength(1);
      expect(res.body.votes[0].userId).toBe(user.id);
    });

    test('should return 401 if guest user does not provide uuid', async () => {
      const voteData = {
        optionId: dbPoll.options[0].id,
        vote: "MAYBE",
        name: 'Guest User'
      };

      await request(app)
        .post(`/api/polls/${dbPoll.id}/vote`)
        .send(voteData)
        .expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 404 if poll does not exist', async () => {
      const { accessToken } = await createAndLoginUserOne();
      const voteData = {
        optionId: dbPoll.options[0].id,
        vote: "NO"
      };

      await request(app)
        .post(`/api/polls/9999/vote`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(voteData)
        .expect(httpStatus.NOT_FOUND);
    });
  });

});
