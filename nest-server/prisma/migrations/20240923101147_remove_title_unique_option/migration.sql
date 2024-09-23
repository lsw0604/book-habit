/*
  Warnings:

  - You are about to alter the column `datetime` on the `book` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropIndex
DROP INDEX `Book_title_key` ON `book`;

-- AlterTable
ALTER TABLE `book` MODIFY `datetime` DATETIME NOT NULL;
