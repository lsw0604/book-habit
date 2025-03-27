-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `publisher` VARCHAR(191) NULL,
    `price` INTEGER NULL,
    `sale_price` INTEGER NULL,
    `thumbnail` VARCHAR(191) NULL,
    `contents` TEXT NULL,
    `url` TEXT NULL,
    `datetime` DATETIME NOT NULL,
    `status` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ISBN` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `bookId` INTEGER NOT NULL,

    UNIQUE INDEX `ISBN_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Translator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `birthday` DATETIME(3) NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE',
    `provider` ENUM('LOCAL', 'KAKAO') NOT NULL DEFAULT 'LOCAL',
    `profile` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MyBook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('WANT_TO_READ', 'CURRENTLY_READING', 'READ') NOT NULL DEFAULT 'WANT_TO_READ',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MyBookReview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `myBookId` INTEGER NOT NULL,
    `review` VARCHAR(191) NOT NULL,
    `isPublic` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `myBookReviewId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewComment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment` VARCHAR(191) NOT NULL,
    `myBookReviewId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tag_value_key`(`value`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MyBookTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `myBookId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MyBookHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `myBookId` INTEGER NOT NULL,
    `startPage` INTEGER NULL,
    `endPage` INTEGER NULL,
    `date` DATETIME(3) NOT NULL,
    `memo` VARCHAR(191) NULL,
    `readingMood` ENUM('INSPIRED', 'EXCITED', 'INTRIGUED', 'SATISFIED', 'NEUTRAL', 'CONFUSED', 'DISAPPOINTED', 'BORED', 'EMOTIONAL', 'THOUGHTFUL', 'CHALLENGED', 'ENLIGHTENED') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ISBN` ADD CONSTRAINT `ISBN_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookAuthor` ADD CONSTRAINT `BookAuthor_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookAuthor` ADD CONSTRAINT `BookAuthor_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Author`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookTranslator` ADD CONSTRAINT `BookTranslator_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookTranslator` ADD CONSTRAINT `BookTranslator_translatorId_fkey` FOREIGN KEY (`translatorId`) REFERENCES `Translator`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyBook` ADD CONSTRAINT `MyBook_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyBook` ADD CONSTRAINT `MyBook_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyBookReview` ADD CONSTRAINT `MyBookReview_myBookId_fkey` FOREIGN KEY (`myBookId`) REFERENCES `MyBook`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewLike` ADD CONSTRAINT `ReviewLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewLike` ADD CONSTRAINT `ReviewLike_myBookReviewId_fkey` FOREIGN KEY (`myBookReviewId`) REFERENCES `MyBookReview`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewComment` ADD CONSTRAINT `ReviewComment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewComment` ADD CONSTRAINT `ReviewComment_myBookReviewId_fkey` FOREIGN KEY (`myBookReviewId`) REFERENCES `MyBookReview`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyBookTag` ADD CONSTRAINT `MyBookTag_myBookId_fkey` FOREIGN KEY (`myBookId`) REFERENCES `MyBook`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyBookTag` ADD CONSTRAINT `MyBookTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyBookHistory` ADD CONSTRAINT `MyBookHistory_myBookId_fkey` FOREIGN KEY (`myBookId`) REFERENCES `MyBook`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
