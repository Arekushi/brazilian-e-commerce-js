/*
  Warnings:

  - You are about to alter the column `gender` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(1)`.

*/
-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "gender" SET DATA TYPE CHAR(1);

-- AlterTable
ALTER TABLE "seller" ADD COLUMN     "birth_date" DATE,
ADD COLUMN     "gender" CHAR(1);
