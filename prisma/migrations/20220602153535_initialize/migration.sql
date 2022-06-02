/*
  Warnings:

  - You are about to drop the column `category_name` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "category_name",
ADD COLUMN     "product_category_id" INTEGER,
ALTER COLUMN "name_lenght" DROP NOT NULL,
ALTER COLUMN "description_lenght" DROP NOT NULL,
ALTER COLUMN "photos_quantity" DROP NOT NULL,
ALTER COLUMN "weight_g" DROP NOT NULL,
ALTER COLUMN "length_cm" DROP NOT NULL,
ALTER COLUMN "height_cm" DROP NOT NULL,
ALTER COLUMN "width_cm" DROP NOT NULL;

-- CreateTable
CREATE TABLE "product_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
