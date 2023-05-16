/*
  Warnings:

  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `password` VARCHAR(255) NULL;
UPDATE `users` SET `password` = '$2a$12$x4hKBNlmumRHZXPC9Czblupi7eX393w0B1Ng2fKvFc8y2.x/xRtma';
ALTER TABLE `users` MODIFY `password` VARCHAR(255) NOT NULL AFTER `username`;
