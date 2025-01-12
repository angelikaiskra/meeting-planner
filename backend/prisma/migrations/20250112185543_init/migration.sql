-- DropForeignKey
ALTER TABLE "MeetingPoll" DROP CONSTRAINT "MeetingPoll_userId_fkey";

-- AddForeignKey
ALTER TABLE "MeetingPoll" ADD CONSTRAINT "MeetingPoll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
