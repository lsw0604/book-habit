-- DropForeignKey
ALTER TABLE `mybookhistory` DROP FOREIGN KEY `MyBookHistory_myBookId_fkey`;

-- DropForeignKey
ALTER TABLE `mybookreview` DROP FOREIGN KEY `MyBookReview_myBookId_fkey`;

-- DropForeignKey
ALTER TABLE `mybooktag` DROP FOREIGN KEY `MyBookTag_myBookId_fkey`;

-- DropForeignKey
ALTER TABLE `reviewcomment` DROP FOREIGN KEY `ReviewComment_myBookReviewId_fkey`;

-- DropForeignKey
ALTER TABLE `reviewlike` DROP FOREIGN KEY `ReviewLike_myBookReviewId_fkey`;

-- AddForeignKey
ALTER TABLE `MyBookReview` ADD CONSTRAINT `MyBookReview_myBookId_fkey` FOREIGN KEY (`myBookId`) REFERENCES `MyBook`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewLike` ADD CONSTRAINT `ReviewLike_myBookReviewId_fkey` FOREIGN KEY (`myBookReviewId`) REFERENCES `MyBookReview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewComment` ADD CONSTRAINT `ReviewComment_myBookReviewId_fkey` FOREIGN KEY (`myBookReviewId`) REFERENCES `MyBookReview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyBookTag` ADD CONSTRAINT `MyBookTag_myBookId_fkey` FOREIGN KEY (`myBookId`) REFERENCES `MyBook`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MyBookHistory` ADD CONSTRAINT `MyBookHistory_myBookId_fkey` FOREIGN KEY (`myBookId`) REFERENCES `MyBook`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
