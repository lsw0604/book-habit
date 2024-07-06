/*
  Warnings:

  - You are about to alter the column `datetime` on the `book` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `sale_price` INTEGER NULL,
    MODIFY `datetime` DATETIME NOT NULL;
