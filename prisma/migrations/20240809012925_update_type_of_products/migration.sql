/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartProductType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `products` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_orderId_fkey";

-- DropForeignKey
ALTER TABLE "CartProductType" DROP CONSTRAINT "CartProductType_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" JSONB NOT NULL,
ADD COLUMN     "products" JSONB NOT NULL;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "CartProductType";
