import { TimeOption } from '@/types/time.ts';

export interface CreateMeetingPollFields {
  title: string;
  description?: string;
  options: TimeOption[];
  settings: PollSettings;
}

export interface PollSettings {
  allowOnlyOneVote?: boolean;
  allowMaybeAnswer?: boolean;
  hideOthersAnswers?: boolean;
  voteDeadline?: string;
}