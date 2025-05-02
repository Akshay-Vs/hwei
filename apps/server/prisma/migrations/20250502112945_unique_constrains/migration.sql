/*
  Warnings:

  - A unique constraint covering the columns `[storeId,name]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storeId,name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Brand_name_key";

-- DropIndex
DROP INDEX "Category_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Brand_storeId_name_key" ON "Brand"("storeId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_storeId_name_key" ON "Category"("storeId", "name");
