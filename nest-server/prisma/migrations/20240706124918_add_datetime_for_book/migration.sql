/*
  Warnings:

  - Added the required column `datetiem` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `datetiem` DATETIME NOT NULL;
