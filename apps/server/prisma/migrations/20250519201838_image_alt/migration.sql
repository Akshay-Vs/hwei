/*
  Warnings:

  - You are about to drop the column `optionId` on the `VariantImage` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `VariantPromotion` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[combinationId,promotionId]` on the table `VariantPromotion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `combinationId` to the `VariantImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combinationId` to the `VariantPromotion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VariantImage" DROP CONSTRAINT "VariantImage_optionId_fkey";

-- DropForeignKey
ALTER TABLE "VariantPromotion" DROP CONSTRAINT "VariantPromotion_variantId_fkey";

-- DropIndex
DROP INDEX "VariantImage_optionId_sortOrder_idx";

-- DropIndex
DROP INDEX "VariantPromotion_variantId_promotionId_key";

-- AlterTable
ALTER TABLE "VariantImage" DROP COLUMN "optionId",
ADD COLUMN     "combinationId" TEXT NOT NULL,
ADD COLUMN     "imageAlt" VARCHAR(255);

-- AlterTable
ALTER TABLE "VariantPromotion" DROP COLUMN "variantId",
ADD COLUMN     "combinationId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "VariantImage_combinationId_sortOrder_idx" ON "VariantImage"("combinationId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "VariantPromotion_combinationId_promotionId_key" ON "VariantPromotion"("combinationId", "promotionId");

-- AddForeignKey
ALTER TABLE "VariantImage" ADD CONSTRAINT "VariantImage_combinationId_fkey" FOREIGN KEY ("combinationId") REFERENCES "VariantCombination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantPromotion" ADD CONSTRAINT "VariantPromotion_combinationId_fkey" FOREIGN KEY ("combinationId") REFERENCES "VariantCombination"("id") ON DELETE CASCADE ON UPDATE CASCADE;
