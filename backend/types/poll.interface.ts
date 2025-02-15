import { MeetingPollOptionType, Prisma } from '@prisma/client';

// Prisma helpers
export type PollWithOptionsAndSettings = Prisma.MeetingPollGetPayload<{
  include: {
    options: {
      include: {
        votes: true
      }
    },
    settings: true,
  };
}>;

// Helper interfaces
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
  voteDeadline?: string | null,
}

// Requests
interface BaseMeetingPollRequest {
  title: string;
  description: string;
  timezone: string;
  options: MeetingTime[];
  settings: MeetingPollSettings;
}

export interface CreateMeetingPollRequest extends BaseMeetingPollRequest { }

export interface UpdateMeetingPollRequest extends Partial<BaseMeetingPollRequest> { }
