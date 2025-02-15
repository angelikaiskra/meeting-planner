import { MeetingPoll, PollSettings } from '@/types/polls';
import { TimeOption } from '@/types/time';

export interface CreateMeetingPollFields {
  title: string;
  description?: string;
  timezone: string;
  options: TimeOption[];
  settings: PollSettings;
}

export interface CreateMeetingPollResponse {
  poll: MeetingPoll;
  isGuest?: boolean;
  guestUuid?: string;
}