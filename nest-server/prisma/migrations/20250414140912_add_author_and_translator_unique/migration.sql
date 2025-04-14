/*
  Warnings:

  - You are about to alter the column `datetime` on the `book` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[name]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Translator` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `datetime` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Author_name_key` ON `Author`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Translator_name_key` ON `Translator`(`name`);
