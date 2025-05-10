/*
  Warnings:

  - A unique constraint covering the columns `[storeId,id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_storeId_id_key" ON "Product"("storeId", "id");
