import Joi from 'joi';

export const createMeetingPollSchema = Joi.object().keys({
  title: Joi.string().required().max(254),
  description: Joi.string().max(1000),
  // timezone: Joi.string().max(200),
  options: Joi.array()
    .items(
      Joi.object({
        startTime: Joi.string().isoDate().required(),
        endTime: Joi.string().isoDate().required(),
      })
    )
    .min(1)
    .required(),
  settings: Joi.object({
    allowOnlyOneVote: Joi.boolean(),
    allowMaybeAnswer: Joi.boolean(),
    hideOthersAnswers: Joi.boolean(),
    // voteDeadline: Joi.string().isoDate()
  })
    .messages({
      'any.required': `"a" is required.`,
      'string.empty': `"a" is required.`,
      'options.required': 'Please add at least one time option'
    })
});

export type CreateMeetingPollSchemaType = Joi.infer<typeof createMeetingPollSchema>;