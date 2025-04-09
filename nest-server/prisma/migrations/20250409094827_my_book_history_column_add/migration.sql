/*
  Warnings:

  - You are about to alter the column `datetime` on the `book` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `endTime` to the `MyBookHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readingMinutes` to the `MyBookHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `MyBookHistory` table without a default value. This is not possible if the table is not empty.
  - Made the column `startPage` on table `mybookhistory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endPage` on table `mybookhistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `datetime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `mybookhistory` ADD COLUMN `endTime` DATETIME(3) NOT NULL,
    ADD COLUMN `readingMinutes` INTEGER NOT NULL,
    ADD COLUMN `startTime` DATETIME(3) NOT NULL,
    MODIFY `startPage` INTEGER NOT NULL,
    MODIFY `endPage` INTEGER NOT NULL;
