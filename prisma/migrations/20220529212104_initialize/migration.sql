/*
  Warnings:

  - You are about to alter the column `city` on the `geolocation` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `customer_id` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(32)`.
  - You are about to alter the column `order_id` on the `order_item` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(32)`.
  - You are about to alter the column `product_id` on the `order_item` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(32)`.
  - You are about to alter the column `seller_id` on the `order_item` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(32)`.
  - You are about to alter the column `order_id` on the `order_payment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(32)`.
  - You are about to alter the column `comment_title` on the `order_review` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `comment_message` on the `order_review` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `description` on the `order_status` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `type` on the `payment_type` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `category_name` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "order_payment" DROP CONSTRAINT "order_payment_order_id_fkey";

-- AlterTable
ALTER TABLE "geolocation" ALTER COLUMN "city" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "customer_id" SET DATA TYPE CHAR(32);

-- AlterTable
ALTER TABLE "order_item" ALTER COLUMN "order_id" SET DATA TYPE CHAR(32),
ALTER COLUMN "product_id" SET DATA TYPE CHAR(32),
ALTER COLUMN "seller_id" SET DATA TYPE CHAR(32);

-- AlterTable
ALTER TABLE "order_payment" ALTER COLUMN "order_id" SET DATA TYPE CHAR(32);

-- AlterTable
ALTER TABLE "order_review" ALTER COLUMN "comment_title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "comment_message" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "order_status" ALTER COLUMN "description" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "payment_type" ALTER COLUMN "type" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "category_name" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_payment" ADD CONSTRAINT "order_payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
