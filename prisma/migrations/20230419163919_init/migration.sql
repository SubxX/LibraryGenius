-- AlterTable
ALTER TABLE "BookItem" ADD COLUMN     "fine_amount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Fine" (
    "id" TEXT NOT NULL,
    "manager_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "booking_item_id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Fine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_booking_item_id_fkey" FOREIGN KEY ("booking_item_id") REFERENCES "BookingItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
