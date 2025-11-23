/*
  Warnings:

  - You are about to drop the column `contents` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `datetime` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `sale_price` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `book` table. All the data in the column will be lost.
  - You are about to drop the `author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bookauthor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `booktranslator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `isbn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `translator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isbn` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookauthor` DROP FOREIGN KEY `BookAuthor_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `bookauthor` DROP FOREIGN KEY `BookAuthor_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `booktranslator` DROP FOREIGN KEY `BookTranslator_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `booktranslator` DROP FOREIGN KEY `BookTranslator_translatorId_fkey`;

-- DropForeignKey
ALTER TABLE `isbn` DROP FOREIGN KEY `ISBN_bookId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `contents`,
    DROP COLUMN `datetime`,
    DROP COLUMN `price`,
    DROP COLUMN `sale_price`,
    DROP COLUMN `status`,
    ADD COLUMN `coverImage` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `isbn` VARCHAR(13) NOT NULL,
    ADD COLUMN `pubDate` DATE NULL,
    ADD COLUMN `stockStatus` VARCHAR(191) NULL,
    ADD COLUMN `subTitle` VARCHAR(191) NULL,
    ADD COLUMN `totalPage` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `mybook` ADD COLUMN `currentPage` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `readCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `startDate` DATETIME(3) NULL;

-- DropTable
DROP TABLE `author`;

-- DropTable
DROP TABLE `bookauthor`;

-- DropTable
DROP TABLE `booktranslator`;

-- DropTable
DROP TABLE `isbn`;

-- DropTable
DROP TABLE `translator`;
