import Joi from 'joi';

const createMeetingPoll = {
  body: Joi.object().keys({
    title: Joi.string().required().max(254),
    description: Joi.string().max(1000),
    timezone: Joi.string().max(200).required(),
    options: Joi.array()
      .items(
        Joi.object({
          type: Joi.string().valid('TIME_RANGE', 'DATE').required(),
          startTime: Joi.when('type', {
            is: 'TIME_RANGE',
            then: Joi.string().isoDate().required(),
            otherwise: Joi.forbidden()
          }),
          endTime: Joi.when('type', {
            is: 'TIME_RANGE',
            then: Joi.string().isoDate().required(),
            otherwise: Joi.forbidden()
          }),
          date: Joi.when('type', {
            is: 'DATE',
            then: Joi.string().isoDate().required(),
            otherwise: Joi.forbidden()
          })
        })
      )
      .min(1)
      .required(),
    settings: Joi.object({
      allowOnlyOneVote: Joi.boolean(),
      allowMaybeAnswer: Joi.boolean(),
      hideOthersAnswers: Joi.boolean(),
      voteDeadline: Joi.string().isoDate().allow(null, '')
    })
  })
};

const queryMeetingPolls = {
  query: Joi.object().keys({
    uuid: Joi.string(),
    sortBy: Joi.string(),
    sortType: Joi.valid('asc', 'desc'),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getMeetingPoll = {
  params: Joi.object().keys({
    pollId: Joi.number().integer().required(),
    uuid: Joi.string()
  })
};

const updateMeetingPoll = {
  params: Joi.object().keys({
    pollId: Joi.number().integer().required(),
    uuid: Joi.string()
  }),
  body: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    timezone: Joi.string(),
    options: Joi.array()
      .items(
        Joi.object({
          type: Joi.string().valid('TIME_RANGE', 'DATE').required(),
          startTime: Joi.when('type', {
            is: 'TIME_RANGE',
            then: Joi.string().isoDate().required(),
            otherwise: Joi.forbidden()
          }),
          endTime: Joi.when('type', {
            is: 'TIME_RANGE',
            then: Joi.string().isoDate().required(),
            otherwise: Joi.forbidden()
          }),
          date: Joi.when('type', {
            is: 'DATE',
            then: Joi.string().isoDate().required(),
            otherwise: Joi.forbidden()
          })
        })
      ),
    settings: Joi.object({
      allowOnlyOneVote: Joi.boolean().optional(),
      allowMaybeAnswer: Joi.boolean().optional(),
      hideOthersAnswers: Joi.boolean().optional(),
      voteDeadline: Joi.string().isoDate().optional()
    })
  })
};

const deleteMeetingPoll = {
  params: Joi.object().keys({
    pollId: Joi.number().integer().required(),
    uuid: Joi.string()
  })
};

const addVoteToMeetingPoll = {
  params: Joi.object().keys({
    pollId: Joi.number().integer().required(),
    uuid: Joi.string()
  }),
  body: Joi.object({
    optionId: Joi.number().integer().required(),
    vote: Joi.valid("YES", "NO", "MAYBE").required(),
    name: Joi.string().max(256)
  })
};

export default {
  createMeetingPoll,
  queryMeetingPolls,
  getMeetingPoll,
  updateMeetingPoll,
  deleteMeetingPoll,
  addVoteToMeetingPoll
};
