/*
  Warnings:

  - You are about to drop the column `bookId` on the `author` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `translator` table. All the data in the column will be lost.
  - You are about to drop the column `translator` on the `translator` table. All the data in the column will be lost.
  - Added the required column `name` to the `Translator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `author` DROP FOREIGN KEY `Author_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `translator` DROP FOREIGN KEY `Translator_bookId_fkey`;

-- AlterTable
ALTER TABLE `author` DROP COLUMN `bookId`;

-- AlterTable
ALTER TABLE `translator` DROP COLUMN `bookId`,
    DROP COLUMN `translator`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `BookAuthor` (
    `bookId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`bookId`, `authorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookTranslator` (
    `bookId` INTEGER NOT NULL,
    `translatorId` INTEGER NOT NULL,

    PRIMARY KEY (`bookId`, `translatorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookAuthor` ADD CONSTRAINT `BookAuthor_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookAuthor` ADD CONSTRAINT `BookAuthor_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Author`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookTranslator` ADD CONSTRAINT `BookTranslator_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookTranslator` ADD CONSTRAINT `BookTranslator_translatorId_fkey` FOREIGN KEY (`translatorId`) REFERENCES `Translator`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
