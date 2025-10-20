/*
  Warnings:

  - Added the required column `symbol` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Currency" ADD COLUMN     "symbol" VARCHAR(10) NOT NULL;
