/*
  Warnings:

  - You are about to drop the column `orderId` on the `Orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_orderId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "orderId",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
