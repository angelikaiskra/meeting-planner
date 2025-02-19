import { useMutation } from '@tanstack/react-query';
import Joi from 'joi';
import { CreateMeetingPollFields, CreateMeetingPollResponse } from '../types/create-poll';
import { api } from '@/lib/api-client';

export const createMeetingPollInputSchema = Joi.object().keys({
    title: Joi.string().required().max(254).messages({ 'string.empty': 'Title is required.', 'string.max': 'Title is too long.' }),
    description: Joi.string().optional().max(1000).messages({ 'string.empty': 'Description is required.', 'string.max': 'Description is too long.' }),
    timezone: Joi.string().max(200),
    options: Joi.array()
        .items(
            Joi.object({
                startTime: Joi.date().iso().required(),
                endTime: Joi.date().iso().greater(Joi.ref('startTime')).required().messages({ 'date.greater': 'Invalid end time selected.' }),
            })
        )
        .min(1)
        .required()
        .messages({ 'array.min': 'Please select at least one option.' }),
    settings: Joi.object({
        allowOnlyOneVote: Joi.boolean(),
        allowMaybeAnswer: Joi.boolean(),
        hideOthersAnswers: Joi.boolean(),
        voteDeadline: Joi.string().isoDate().allow(null, '')
    })
});

export const createMeetingPoll = ({ data }: { data: CreateMeetingPollFields }): Promise<CreateMeetingPollResponse> => {
    const parsedData = { ...data };

    parsedData.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    parsedData.options = parsedData.options.map((option) => {
        return {
            type: "TIME_RANGE",
            startTime: new Date(option.startTime),
            endTime: new Date(option.endTime)
        };
    });

    return api.post(`/polls`, parsedData);
};

type CreateMeetingPollMutationConfig = {
    mutationConfig?: Parameters<typeof useMutation>[0];
};

export const useCreateMeetingPoll = ({ mutationConfig }: CreateMeetingPollMutationConfig = {}) => {
    // const queryClient = useQueryClient();

    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            // if guest then store guestUuid in local storage
            if (args[0].isGuest && args[0].guestUuid && args[0].poll.id) {
                localStorage.setItem(`${args[0].poll.id}:guestUuid`, args[0].guestUuid);
            } else {
                console.error('Could not store guestUuid in local storage');
            }

            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: createMeetingPoll,
    });
};