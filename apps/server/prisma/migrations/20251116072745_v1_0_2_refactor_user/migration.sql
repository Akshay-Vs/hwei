/*
  Warnings:

  - You are about to drop the column `billingAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripePaymentIntentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `billingAddressId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddressId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPER_ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'REQUIRES_ACTION', 'SUCCEEDED', 'FAILED', 'PARTIALLY_REFUNDED', 'REFUNDED', 'DISPUTED');

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_storeId_fkey";

-- DropIndex
DROP INDEX "Order_orderNumber_idx";

-- DropIndex
DROP INDEX "Order_storeId_createdAt_idx";

-- DropIndex
DROP INDEX "Order_storeId_userId_status_idx";

-- DropIndex
DROP INDEX "Order_userId_createdAt_idx";

-- DropIndex
DROP INDEX "Wishlist_userId_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "billingAddress",
DROP COLUMN "shippingAddress",
DROP COLUMN "tax",
DROP COLUMN "total",
ADD COLUMN     "amountPaid" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "amountRefunded" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "billingAddressId" TEXT NOT NULL,
ADD COLUMN     "billingAddressSnapshot" JSONB,
ADD COLUMN     "calculationLog" JSONB,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "shippedAt" TIMESTAMP(3),
ADD COLUMN     "shippingAddressId" TEXT NOT NULL,
ADD COLUMN     "shippingAddressSnapshot" JSONB,
ADD COLUMN     "stripeChargeId" VARCHAR(255),
ADD COLUMN     "stripeCustomerId" VARCHAR(255),
ADD COLUMN     "stripePaymentIntentId" VARCHAR(255),
ADD COLUMN     "stripeWebhookLog" JSONB,
ADD COLUMN     "taxAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalAmount" INTEGER NOT NULL,
ALTER COLUMN "subtotal" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" VARCHAR(64) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "fullName" VARCHAR(255),
    "avatar" VARCHAR(255),
    "status" "user_status" NOT NULL DEFAULT 'ACTIVE',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "userId" VARCHAR(64) NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "address1" VARCHAR(255) NOT NULL,
    "address2" VARCHAR(255),
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "zip" VARCHAR(20) NOT NULL,
    "country" VARCHAR(2) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_clerkId_email_deletedAt_idx" ON "User"("clerkId", "email", "deletedAt");

-- CreateIndex
CREATE INDEX "Address_userId_isActive_idx" ON "Address"("userId", "isActive");

-- CreateIndex
CREATE INDEX "Address_userId_isDefault_idx" ON "Address"("userId", "isDefault");

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripePaymentIntentId_key" ON "Order"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "Order_storeId_status_createdAt_idx" ON "Order"("storeId", "status", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Order_userId_status_createdAt_idx" ON "Order"("userId", "status", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Order_status_createdAt_idx" ON "Order"("status", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Order_storeId_userId_idx" ON "Order"("storeId", "userId");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
