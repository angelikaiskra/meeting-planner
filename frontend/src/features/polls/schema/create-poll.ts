import Joi from 'joi';

export const createMeetingPollSchema = Joi.object().keys({
  title: Joi.string().required().max(254).messages({ 'string.empty': 'Title is required.', 'string.max': 'Title is too long.' }),
  description: Joi.string().max(1000).messages({ 'string.empty': 'Description is required.', 'string.max': 'Description is too long.' }),
  // timezone: Joi.string().max(200),
  options: Joi.array()
    .items(
      Joi.object({
        startTime: Joi.date().iso().required(),
        endTime: Joi.date().iso().greater(Joi.ref('startTime')).required()
      })
    )
    .min(1)
    .required()
    .messages({ 'array.min': 'Please select at least one option.' }),
  settings: Joi.object({
    allowOnlyOneVote: Joi.boolean(),
    allowMaybeAnswer: Joi.boolean(),
    hideOthersAnswers: Joi.boolean(),
    voteDeadline: Joi.string().isoDate()
  })
});
