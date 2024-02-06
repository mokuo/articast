-- CreateTable
CREATE TABLE `article_crawlings` (
    `article_url` VARCHAR(191) NOT NULL,
    `crawled_content_path` VARCHAR(191) NOT NULL,
    `crawled_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`article_url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `article_crawlings` ADD CONSTRAINT `article_crawlings_article_url_fkey` FOREIGN KEY (`article_url`) REFERENCES `articles`(`url`) ON DELETE RESTRICT ON UPDATE CASCADE;
