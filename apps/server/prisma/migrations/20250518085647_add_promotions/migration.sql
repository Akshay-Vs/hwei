/*
  Warnings:

  - You are about to drop the column `priceDelta` on the `VariantCombination` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `VariantOption` table. All the data in the column will be lost.
  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `currency` to the `VariantCombination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `VariantCombination` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('FIXED', 'PERCENTAGE');

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_productId_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_variantId_fkey";

-- AlterTable
ALTER TABLE "VariantCombination" DROP COLUMN "priceDelta",
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "VariantOption" DROP COLUMN "image",
ADD COLUMN     "images" VARCHAR(255)[],
ADD COLUMN     "thumbnail" VARCHAR(255);

-- DropTable
DROP TABLE "Price";

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "discountType" "DiscountType" NOT NULL,
    "value" INTEGER NOT NULL,
    "minPrice" INTEGER,
    "maxPrice" INTEGER,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isGlobal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantPromotion" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,

    CONSTRAINT "VariantPromotion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VariantPromotion_variantId_promotionId_key" ON "VariantPromotion"("variantId", "promotionId");

-- AddForeignKey
ALTER TABLE "VariantPromotion" ADD CONSTRAINT "VariantPromotion_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "VariantCombination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantPromotion" ADD CONSTRAINT "VariantPromotion_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
