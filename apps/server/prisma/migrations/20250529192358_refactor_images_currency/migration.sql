/*
  Warnings:

  - You are about to drop the column `name` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `maxPrice` on the `Promotion` table. All the data in the column will be lost.
  - You are about to drop the column `minPrice` on the `Promotion` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `VariantOption` table. All the data in the column will be lost.
  - You are about to drop the `VariantImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `label` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `VariantOption` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VariantImage" DROP CONSTRAINT "VariantImage_combinationId_fkey";

-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "name",
DROP COLUMN "symbol",
ADD COLUMN     "label" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "maxPrice",
DROP COLUMN "minPrice",
ADD COLUMN     "maxPurchase" INTEGER,
ADD COLUMN     "minPurchase" INTEGER;

-- AlterTable
ALTER TABLE "VariantOption" DROP COLUMN "label",
ADD COLUMN     "name" VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE "VariantImage";

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "imageAlt" VARCHAR(255),
    "sortOrder" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductImage_productId_sortOrder_idx" ON "ProductImage"("productId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_id_productId_key" ON "ProductImage"("id", "productId");

-- CreateIndex
CREATE INDEX "VariantInventory_stock_idx" ON "VariantInventory"("stock");

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
