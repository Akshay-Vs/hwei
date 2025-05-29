/*
  Warnings:

  - You are about to drop the column `isGlobal` on the `Promotion` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Promotion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `currency` on the `VariantCombination` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `VariantCombination` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `VariantCombination` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `VariantOption` table. All the data in the column will be lost.
  - Changed the type of `discountType` on the `Promotion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ScopeType" AS ENUM ('GLOBAL', 'BRAND', 'CATEGORY', 'PRODUCT', 'VARIANT');

-- CreateEnum
CREATE TYPE "discount_type" AS ENUM ('FIXED', 'PERCENTAGE');

-- DropForeignKey
ALTER TABLE "VariantPromotion" DROP CONSTRAINT "VariantPromotion_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "VariantPromotion" DROP CONSTRAINT "VariantPromotion_variantId_fkey";

-- DropIndex
DROP INDEX "Product_createdAt_id_idx";

-- DropIndex
DROP INDEX "Store_createdAt_id_idx";

-- DropIndex
DROP INDEX "VariantCombination_productId_createdAt_idx";

-- DropIndex
DROP INDEX "VariantCombination_productId_sku_key";

-- AlterTable
ALTER TABLE "Brand" ALTER COLUMN "description" SET DATA TYPE TEXT,
ALTER COLUMN "image" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "isGlobal",
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
DROP COLUMN "discountType",
ADD COLUMN     "discountType" "discount_type" NOT NULL;

-- AlterTable
ALTER TABLE "Store" ALTER COLUMN "icon" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "VariantCombination" DROP COLUMN "currency",
DROP COLUMN "price",
DROP COLUMN "stock",
ALTER COLUMN "sku" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "VariantOption" DROP COLUMN "images";

-- DropEnum
DROP TYPE "DiscountType";

-- CreateTable
CREATE TABLE "VariantImage" (
    "id" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "VariantImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantPricing" (
    "id" TEXT NOT NULL,
    "combinationId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currencyId" TEXT NOT NULL,

    CONSTRAINT "VariantPricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantInventory" (
    "id" TEXT NOT NULL,
    "combinationId" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "VariantInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "symbol" VARCHAR(5) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionScope" (
    "id" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,
    "scopeType" "ScopeType" NOT NULL,
    "targetId" TEXT NOT NULL,

    CONSTRAINT "PromotionScope_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VariantImage_optionId_sortOrder_idx" ON "VariantImage"("optionId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "VariantPricing_combinationId_key" ON "VariantPricing"("combinationId");

-- CreateIndex
CREATE INDEX "VariantPricing_currencyId_idx" ON "VariantPricing"("currencyId");

-- CreateIndex
CREATE UNIQUE INDEX "VariantInventory_combinationId_key" ON "VariantInventory"("combinationId");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE INDEX "Currency_storeId_idx" ON "Currency"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_storeId_code_key" ON "Currency"("storeId", "code");

-- CreateIndex
CREATE INDEX "PromotionScope_scopeType_targetId_idx" ON "PromotionScope"("scopeType", "targetId");

-- CreateIndex
CREATE INDEX "PromotionScope_promotionId_idx" ON "PromotionScope"("promotionId");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Promotion_startDate_endDate_idx" ON "Promotion"("startDate", "endDate");

-- CreateIndex
CREATE INDEX "Store_slug_idx" ON "Store"("slug");

-- CreateIndex
CREATE INDEX "VariantCombination_productId_idx" ON "VariantCombination"("productId");

-- CreateIndex
CREATE INDEX "VariantPromotion_promotionId_idx" ON "VariantPromotion"("promotionId");

-- AddForeignKey
ALTER TABLE "VariantImage" ADD CONSTRAINT "VariantImage_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "VariantOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantPricing" ADD CONSTRAINT "VariantPricing_combinationId_fkey" FOREIGN KEY ("combinationId") REFERENCES "VariantCombination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantPricing" ADD CONSTRAINT "VariantPricing_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantInventory" ADD CONSTRAINT "VariantInventory_combinationId_fkey" FOREIGN KEY ("combinationId") REFERENCES "VariantCombination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionScope" ADD CONSTRAINT "PromotionScope_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantPromotion" ADD CONSTRAINT "VariantPromotion_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "VariantCombination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantPromotion" ADD CONSTRAINT "VariantPromotion_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
