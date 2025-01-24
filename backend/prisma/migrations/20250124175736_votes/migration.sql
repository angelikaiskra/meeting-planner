/*
  Warnings:

  - You are about to drop the column `meetingTimeId` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `meetingOptionId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_meetingTimeId_fkey";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "meetingTimeId",
ADD COLUMN     "meetingOptionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_meetingOptionId_fkey" FOREIGN KEY ("meetingOptionId") REFERENCES "MeetingPollOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
