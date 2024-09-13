/*
  Warnings:

  - You are about to drop the column `permisions` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "permisions",
ADD COLUMN     "permissions" TEXT[];
