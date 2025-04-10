/*
  Warnings:

  - You are about to alter the column `datetime` on the `book` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[myBookId]` on the table `MyBookReview` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `datetime` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MyBookReview_myBookId_key` ON `MyBookReview`(`myBookId`);
