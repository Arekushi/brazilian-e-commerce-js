/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `product_category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_category_name_key" ON "product_category"("name");
