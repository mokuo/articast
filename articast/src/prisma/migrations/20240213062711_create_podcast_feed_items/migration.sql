-- CreateTable
CREATE TABLE `podcast_feed_items` (
    `title` VARCHAR(191) NOT NULL,
    `enclosure_url` VARCHAR(191) NOT NULL,
    `enclosure_length` INTEGER NOT NULL,
    `enclosure_type` VARCHAR(191) NOT NULL,
    `guid` VARCHAR(191) NOT NULL,
    `pub_date` DATETIME(3) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`guid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
