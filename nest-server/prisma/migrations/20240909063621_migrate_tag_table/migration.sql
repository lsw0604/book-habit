/*
  Warnings:

  - You are about to alter the column `datetime` on the `book` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[tag]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Made the column `tag` on table `tag` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `datetime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tag` MODIFY `tag` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tag_tag_key` ON `Tag`(`tag`);
