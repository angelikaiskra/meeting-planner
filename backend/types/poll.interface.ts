import { MeetingPollOptionType } from '@prisma/client';

export interface MeetingPoll {
  id: number,
  userId?: number,
  title: string,
  timezone: string,
  description: string,
  options: MeetingTime[],
  settings: MeetingPollSettings,
}

export interface MeetingTime {
  type: MeetingPollOptionType,
  start_time?: Date,
  end_time?: Date,
  date?: string,
}

export interface MeetingPollSettings {
  allowOnlyOneVote?: boolean,
  allowMaybeAnswer?: boolean,
  hideOthersAnswers?: boolean,
  voteDeadline?: Date,
}

// Requests
export interface CreateMeetingPollRequest {
  title: string;
  description: string;
  timezone: string;
  options: MeetingTime[];
  settings: MeetingPollSettings;
}