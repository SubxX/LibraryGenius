/*
  Warnings:

  - You are about to drop the column `title` on the `BookItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookItem" DROP COLUMN "title",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;
