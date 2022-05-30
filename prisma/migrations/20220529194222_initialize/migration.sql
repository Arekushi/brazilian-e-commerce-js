-- CreateTable
CREATE TABLE "geolocation" (
    "id" SERIAL NOT NULL,
    "zip_code_prefix" CHAR(5) NOT NULL,
    "city" TEXT NOT NULL,
    "state" CHAR(2) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "geolocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" CHAR(32) NOT NULL,
    "unique_id" CHAR(32) NOT NULL,
    "geolocation_id" INTEGER,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seller" (
    "id" CHAR(32) NOT NULL,
    "geolocation_id" INTEGER,

    CONSTRAINT "seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" CHAR(32) NOT NULL,
    "category_name" TEXT NOT NULL,
    "name_lenght" INTEGER NOT NULL,
    "description_lenght" INTEGER NOT NULL,
    "photos_quantity" INTEGER NOT NULL,
    "weight_g" DOUBLE PRECISION NOT NULL,
    "length_cm" DOUBLE PRECISION NOT NULL,
    "height_cm" DOUBLE PRECISION NOT NULL,
    "width_cm" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_status" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_type" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "payment_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" CHAR(32) NOT NULL,
    "purchase_timestamp" TIMESTAMP(3) NOT NULL,
    "approved_at" TIMESTAMP(3),
    "delivered_carrier_date" TIMESTAMP(3),
    "delivered_customer_date" TIMESTAMP(3),
    "estimated_delivery_date" TIMESTAMP(3),
    "customer_id" TEXT NOT NULL,
    "status_id" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_review" (
    "id" CHAR(32) NOT NULL,
    "score" INTEGER NOT NULL,
    "comment_title" TEXT,
    "comment_message" TEXT,
    "creation_date" TIMESTAMP(3) NOT NULL,
    "answer_date" TIMESTAMP(3),
    "order_id" TEXT NOT NULL,

    CONSTRAINT "order_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_payment" (
    "id" CHAR(32) NOT NULL,
    "sequential" INTEGER NOT NULL,
    "installments" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type_id" INTEGER NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "order_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" CHAR(32) NOT NULL,
    "shipping_limit_date" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "freight_value" DOUBLE PRECISION NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_unique_id_key" ON "customer"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_review_order_id_key" ON "order_review"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_payment_order_id_key" ON "order_payment"("order_id");

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_geolocation_id_fkey" FOREIGN KEY ("geolocation_id") REFERENCES "geolocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_geolocation_id_fkey" FOREIGN KEY ("geolocation_id") REFERENCES "geolocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_review" ADD CONSTRAINT "order_review_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_payment" ADD CONSTRAINT "order_payment_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "payment_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_payment" ADD CONSTRAINT "order_payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
