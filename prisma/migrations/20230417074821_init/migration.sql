-- CreateTable
CREATE TABLE "BookItem" (
    "id" TEXT NOT NULL,
    "acceptedDuration" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "rack" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,

    CONSTRAINT "BookItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookItem" ADD CONSTRAINT "BookItem_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookItem" ADD CONSTRAINT "BookItem_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
