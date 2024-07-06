/*
  Warnings:

  - You are about to drop the column `datetiem` on the `book` table. All the data in the column will be lost.
  - Added the required column `datetime` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `datetiem`,
    ADD COLUMN `datetime` DATETIME NOT NULL;
