-- CreateTable
CREATE TABLE `blog_feeds` (
    `url` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `url` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article_sources` (
    `blog_feed_url` VARCHAR(191) NOT NULL,
    `article_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`blog_feed_url`, `article_url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `article_sources` ADD CONSTRAINT `article_sources_blog_feed_url_fkey` FOREIGN KEY (`blog_feed_url`) REFERENCES `blog_feeds`(`url`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_sources` ADD CONSTRAINT `article_sources_article_url_fkey` FOREIGN KEY (`article_url`) REFERENCES `articles`(`url`) ON DELETE RESTRICT ON UPDATE CASCADE;
