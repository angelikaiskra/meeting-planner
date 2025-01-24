/*
  Warnings:

  - The values [VERIFY_EMAIL] on the enum `TokenType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `guestId` on the `MeetingPoll` table. All the data in the column will be lost.
  - The required column `ownerUuid` was added to the `MeetingPoll` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TokenType_new" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD');
ALTER TABLE "Token" ALTER COLUMN "type" TYPE "TokenType_new" USING ("type"::text::"TokenType_new");
ALTER TYPE "TokenType" RENAME TO "TokenType_old";
ALTER TYPE "TokenType_new" RENAME TO "TokenType";
DROP TYPE "TokenType_old";
COMMIT;

-- AlterTable
ALTER TABLE "MeetingPoll" DROP COLUMN "guestId",
ADD COLUMN     "ownerUuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "guestUuid" TEXT;
