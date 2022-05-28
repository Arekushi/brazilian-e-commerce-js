/*
  Warnings:

  - You are about to drop the column `geolocation_zip_code` on the `customer` table. All the data in the column will be lost.
  - The primary key for the `geolocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `geolocation_zip_code` on the `seller` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_geolocation_zip_code_fkey";

-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_geolocation_zip_code_fkey";

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "geolocation_zip_code",
ADD COLUMN     "geolocation_id" INTEGER;

-- AlterTable
ALTER TABLE "geolocation" DROP CONSTRAINT "geolocation_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "geolocation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "seller" DROP COLUMN "geolocation_zip_code",
ADD COLUMN     "geolocation_id" INTEGER;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_geolocation_id_fkey" FOREIGN KEY ("geolocation_id") REFERENCES "geolocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_geolocation_id_fkey" FOREIGN KEY ("geolocation_id") REFERENCES "geolocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
