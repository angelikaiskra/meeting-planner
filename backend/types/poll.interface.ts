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
  startTime?: string,
  endTime?: string,
  date?: string,
}

export interface MeetingPollSettings {
  allowOnlyOneVote?: boolean,
  allowMaybeAnswer?: boolean,
  hideOthersAnswers?: boolean,
  voteDeadline?: string,
}

// Requests
export interface CreateMeetingPollRequest {
  title: string;
  description: string;
  timezone: string;
  options: MeetingTime[];
  settings: MeetingPollSettings;
}