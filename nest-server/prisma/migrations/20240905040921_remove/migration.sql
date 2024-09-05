/*
  Warnings:

  - You are about to alter the column `datetime` on the `book` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `status` on the `mybookcomment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `datetime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `mybookcomment` DROP COLUMN `status`;
