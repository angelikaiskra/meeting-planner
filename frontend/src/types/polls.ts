export interface PollSettings {
    allowOnlyOneVote?: boolean;
    allowMaybeAnswer?: boolean;
    hideOthersAnswers?: boolean;
    voteDeadline?: string;
}

export interface MeetingTime {
    id: string;
    pollId: string;
    type: "DATE" | "TIME_RANGE";
    startTime?: string;
    endTime?: string;
    date?: string;
    votes: Array<{
        id: string;
    }>;
}

export interface MeetingPoll {
    id: string;
    title: string;
    description: string;
    timezone: string;
    status: "OPEN" | "CLOSED";
    options: MeetingTime[];
    settings: PollSettings;
    createdAt: string;
    updatedAt: string;
    userId?: string;
    user?: {
        id: string;
        name: string;
    };
}

export type Vote = "YES" | "NO" | "MAYBE";