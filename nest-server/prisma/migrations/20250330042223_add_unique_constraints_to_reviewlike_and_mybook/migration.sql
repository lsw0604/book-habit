/*
  Warnings:

  - You are about to alter the column `datetime` on the `book` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[userId,bookId]` on the table `MyBook` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,myBookReviewId]` on the table `ReviewLike` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `datetime` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MyBook_userId_bookId_key` ON `MyBook`(`userId`, `bookId`);

-- CreateIndex
CREATE UNIQUE INDEX `ReviewLike_userId_myBookReviewId_key` ON `ReviewLike`(`userId`, `myBookReviewId`);
