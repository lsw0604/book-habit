-- CreateTable
CREATE TABLE `Translator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `translator` VARCHAR(191) NOT NULL,
    `bookId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Translator` ADD CONSTRAINT `Translator_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
