/*
  Warnings:

  - You are about to drop the column `roleId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('FOODIE', 'CHEF');

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_roleId_fkey";

-- DropIndex
DROP INDEX "Users_roleId_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "roleId",
ADD COLUMN     "role" "UserRole" NOT NULL;

-- DropTable
DROP TABLE "Roles";
