/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD', 'VERIFY_EMAIL');

-- AlterTable
ALTER TABLE "MeetingPoll" ADD COLUMN     "guestId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "password" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "blacklisted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
