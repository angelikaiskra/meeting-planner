export interface MeetingPoll {
  id: number,
  userId?: number,
  title: string,
  description: string,
  proposedTimes: MeetingTime[],
  settings: MeetingPollSettings,
}

export interface MeetingTime {
  proposedTimeStart: Date,
  proposedTimeEnd: Date,
}

export interface MeetingPollSettings {
  allowOnlyOneVote?: boolean,
  allowMaybeAnswer?: boolean,
  hideOthersAnswers?: boolean,
  voteDeadline?: Date,
  timezone?: string,
}

// Requests
export interface CreateMeetingPollRequest {
  title: string;
  description: string;
  proposedTimes: MeetingTime[];
  settings: MeetingPollSettings;
}