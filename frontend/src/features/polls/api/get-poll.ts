import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MeetingPoll } from "@/types/polls";

export const getMeetingPoll = ({
    pollId,
    guestUuid
}: {
    pollId: string;
    guestUuid?: string | null;
}): Promise<MeetingPoll> => {

    return api.get(`/polls/${pollId}/${guestUuid}`);
};

export const getMeetingPollQueryOptions = (pollId: string, guestUuid?: string | null) => {
    return queryOptions({
        queryKey: ['meetingPolls', pollId],
        queryFn: () => getMeetingPoll({ pollId, guestUuid }),
    });
};

type UseMeetingPollOptions = {
    pollId: string;
    guestUuid?: string | null;
    queryConfig?: Partial<ReturnType<typeof getMeetingPollQueryOptions>>;
};

export const useMeetingPoll = ({
    pollId,
    guestUuid,
    queryConfig,
}: UseMeetingPollOptions) => {
    return useQuery({
        ...getMeetingPollQueryOptions(pollId, guestUuid),
        ...queryConfig,
    });
};