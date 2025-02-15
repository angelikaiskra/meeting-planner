export interface PollSettings {
    allowOnlyOneVote?: boolean;
    allowMaybeAnswer?: boolean;
    hideOthersAnswers?: boolean;
    voteDeadline?: string;
}

export interface MeetingTime {
    type: "DATE" | "TIME_RANGE",
    startTime?: string,
    endTime?: string,
    date?: string,
}

export interface MeetingPoll {
    id: string;
    title: string;
    description: string;
    timezone: string;
    status: "OPEN" | "CLOSED";
    options: MeetingTime[];
    settings: PollSettings;
}
