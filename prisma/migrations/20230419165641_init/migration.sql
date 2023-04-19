/*
  Warnings:

  - You are about to drop the column `booking_item_id` on the `Fine` table. All the data in the column will be lost.
  - Added the required column `booking_item` to the `Fine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Fine" DROP CONSTRAINT "Fine_booking_item_id_fkey";

-- AlterTable
ALTER TABLE "Fine" DROP COLUMN "booking_item_id",
ADD COLUMN     "booking_item" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_booking_item_fkey" FOREIGN KEY ("booking_item") REFERENCES "BookingItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
