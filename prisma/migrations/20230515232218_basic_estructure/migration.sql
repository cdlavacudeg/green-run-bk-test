/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
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

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id_transaction` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `category` ENUM('deposit', 'withdraw', 'bet', 'winning') NOT NULL,
    `status` ENUM('active', 'canceled') NOT NULL,
    `id_bet` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_transaction`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bets` (
    `id_bet` INTEGER NOT NULL AUTO_INCREMENT,
    `bet_option` INTEGER NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `odd` DECIMAL(10, 2) NOT NULL,
    `result` ENUM('win', 'lose') NULL,
    `status` ENUM('active', 'canceled', 'settled') NOT NULL DEFAULT 'active',
    `id_event` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_bet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id_event` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `sport` VARCHAR(200) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_event`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_id_bet_fkey` FOREIGN KEY (`id_bet`) REFERENCES `bets`(`id_bet`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bets` ADD CONSTRAINT `bets_id_event_fkey` FOREIGN KEY (`id_event`) REFERENCES `events`(`id_event`) ON DELETE RESTRICT ON UPDATE CASCADE;
