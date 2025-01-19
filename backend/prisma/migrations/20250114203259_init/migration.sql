-- DropForeignKey
ALTER TABLE "MeetingPollSettings" DROP CONSTRAINT "MeetingPollSettings_pollId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingTime" DROP CONSTRAINT "MeetingTime_pollId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_meetingTimeId_fkey";

-- AddForeignKey
ALTER TABLE "MeetingPollSettings" ADD CONSTRAINT "MeetingPollSettings_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "MeetingPoll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingTime" ADD CONSTRAINT "MeetingTime_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "MeetingPoll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_meetingTimeId_fkey" FOREIGN KEY ("meetingTimeId") REFERENCES "MeetingTime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
