/*
  Warnings:

  - A unique constraint covering the columns `[productId,sku]` on the table `VariantCombination` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VariantCombination_productId_sku_key" ON "VariantCombination"("productId", "sku");
