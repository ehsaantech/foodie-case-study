/*
  Warnings:

  - A unique constraint covering the columns `[loginId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `loginId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "loginId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Login" (
    "Id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Login_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_loginId_key" ON "Users"("loginId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
