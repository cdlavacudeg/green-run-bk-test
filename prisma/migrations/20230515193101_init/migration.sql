-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(150) NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(200) NOT NULL,
    `address` VARCHAR(200) NULL,
    `gender` VARCHAR(100) NULL,
    `birthDate` DATE NOT NULL,
    `country_id` INTEGER NULL,
    `city` VARCHAR(200) NULL,
    `documentId` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
