-- CreateTable
CREATE TABLE `episode_audios` (
    `id` VARCHAR(191) NOT NULL,
    `audio_file_path` VARCHAR(191) NOT NULL,
    `generated_at` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `episode_audio_origins` (
    `episode_audio_id` VARCHAR(191) NOT NULL,
    `blog_feed_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `episode_audio_origins_episode_audio_id_key`(`episode_audio_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `episode_audio_articles` (
    `episode_audio_id` VARCHAR(191) NOT NULL,
    `article_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `episode_audio_articles_article_url_key`(`article_url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `episode_audio_origins` ADD CONSTRAINT `episode_audio_origins_episode_audio_id_fkey` FOREIGN KEY (`episode_audio_id`) REFERENCES `episode_audios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `episode_audio_origins` ADD CONSTRAINT `episode_audio_origins_blog_feed_url_fkey` FOREIGN KEY (`blog_feed_url`) REFERENCES `blog_feeds`(`url`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `episode_audio_articles` ADD CONSTRAINT `episode_audio_articles_episode_audio_id_fkey` FOREIGN KEY (`episode_audio_id`) REFERENCES `episode_audios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `episode_audio_articles` ADD CONSTRAINT `episode_audio_articles_article_url_fkey` FOREIGN KEY (`article_url`) REFERENCES `articles`(`url`) ON DELETE RESTRICT ON UPDATE CASCADE;
