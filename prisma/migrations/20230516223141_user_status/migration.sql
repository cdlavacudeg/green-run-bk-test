/*
  Warnings:

  - The values [winning] on the enum `transactions_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `category` ENUM('deposit', 'withdraw', 'bet') NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `status` ENUM('active', 'blocked') NOT NULL DEFAULT 'active' AFTER `documentId`;
