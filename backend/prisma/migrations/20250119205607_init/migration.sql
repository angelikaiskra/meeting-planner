/*
  Warnings:

  - You are about to drop the column `timezone` on the `MeetingPollSettings` table. All the data in the column will be lost.
  - You are about to drop the `MeetingTime` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MeetingPollStatus" AS ENUM ('OPEN', 'PAUSED');

-- CreateEnum
CREATE TYPE "MeetingPollOptionType" AS ENUM ('DATE', 'TIME_RANGE');

-- DropForeignKey
ALTER TABLE "MeetingPoll" DROP CONSTRAINT "MeetingPoll_userId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingPollSettings" DROP CONSTRAINT "MeetingPollSettings_pollId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingTime" DROP CONSTRAINT "MeetingTime_pollId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_meetingTimeId_fkey";

-- AlterTable
ALTER TABLE "MeetingPoll" ADD COLUMN     "status" "MeetingPollStatus" NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "timezone" TEXT;

-- AlterTable
ALTER TABLE "MeetingPollSettings" DROP COLUMN "timezone";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- DropTable
DROP TABLE "MeetingTime";

-- CreateTable
CREATE TABLE "MeetingPollOption" (
    "id" SERIAL NOT NULL,
    "type" "MeetingPollOptionType" NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "date" TEXT,
    "pollId" INTEGER NOT NULL,

    CONSTRAINT "MeetingPollOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MeetingPoll" ADD CONSTRAINT "MeetingPoll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingPollSettings" ADD CONSTRAINT "MeetingPollSettings_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "MeetingPoll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingPollOption" ADD CONSTRAINT "MeetingPollOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "MeetingPoll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_meetingTimeId_fkey" FOREIGN KEY ("meetingTimeId") REFERENCES "MeetingPollOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
