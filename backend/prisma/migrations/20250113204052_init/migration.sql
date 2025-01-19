/*
  Warnings:

  - You are about to drop the column `proposedTime` on the `MeetingTime` table. All the data in the column will be lost.
  - Added the required column `proposedTimeEnd` to the `MeetingTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposedTimeStart` to the `MeetingTime` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- AlterTable
ALTER TABLE "MeetingPoll" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MeetingTime" DROP COLUMN "proposedTime",
ADD COLUMN     "proposedTimeEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "proposedTimeStart" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
