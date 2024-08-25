/*
  Warnings:

  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `deliveryStatus` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL,
DROP COLUMN "deliveryStatus",
ADD COLUMN     "deliveryStatus" TEXT NOT NULL;

-- DropEnum
DROP TYPE "deliveryStatus";

-- DropEnum
DROP TYPE "statusPaymentOrder";
