/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deliveryStatus` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "statusPaymentOrder" AS ENUM ('pending', 'paid');

-- CreateEnum
CREATE TYPE "deliveryStatus" AS ENUM ('delivered', 'pending', 'paid', 'dispatched', 'cancelled');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "statusPaymentOrder" NOT NULL DEFAULT 'pending',
DROP COLUMN "deliveryStatus",
ADD COLUMN     "deliveryStatus" "deliveryStatus" NOT NULL DEFAULT 'pending',
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
