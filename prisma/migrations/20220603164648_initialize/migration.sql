-- CreateTable
CREATE TABLE "geolocation" (
    "id" SERIAL NOT NULL,
    "zip_code_prefix" CHAR(5) NOT NULL,
    "city" VARCHAR(255),
    "city_codename" VARCHAR(255) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "geolocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" CHAR(32) NOT NULL,
    "name" VARCHAR(255),
    "geolocation_id" INTEGER,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seller" (
    "id" CHAR(32) NOT NULL,
    "name" VARCHAR(255),
    "geolocation_id" INTEGER,

    CONSTRAINT "seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" CHAR(32) NOT NULL,
    "name_lenght" INTEGER,
    "description_lenght" INTEGER,
    "photos_quantity" INTEGER,
    "weight_g" DOUBLE PRECISION,
    "length_cm" DOUBLE PRECISION,
    "height_cm" DOUBLE PRECISION,
    "width_cm" DOUBLE PRECISION,
    "product_category_id" INTEGER,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" CHAR(32) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "purchase_timestamp" TIMESTAMP(3) NOT NULL,
    "approved_at" TIMESTAMP(3),
    "delivered_carrier_date" TIMESTAMP(3),
    "delivered_customer_date" TIMESTAMP(3),
    "estimated_delivery_date" TIMESTAMP(3),
    "customer_id" CHAR(32) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_review" (
    "id" CHAR(32) NOT NULL,
    "score" INTEGER NOT NULL,
    "comment_title" VARCHAR(255),
    "comment_message" VARCHAR(500),
    "creation_date" TIMESTAMP(3) NOT NULL,
    "answer_date" TIMESTAMP(3),
    "order_id" TEXT NOT NULL,

    CONSTRAINT "order_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_payment" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "sequential" INTEGER NOT NULL,
    "installments" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "order_id" CHAR(32) NOT NULL,

    CONSTRAINT "order_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" SERIAL NOT NULL,
    "order_item_id" INTEGER NOT NULL,
    "shipping_limit_date" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "freight_value" DOUBLE PRECISION NOT NULL,
    "order_id" CHAR(32) NOT NULL,
    "product_id" CHAR(32) NOT NULL,
    "seller_id" CHAR(32) NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "geolocation_zip_code_prefix_city_codename_state_key" ON "geolocation"("zip_code_prefix", "city_codename", "state");

-- CreateIndex
CREATE UNIQUE INDEX "product_category_name_key" ON "product_category"("name");

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_geolocation_id_fkey" FOREIGN KEY ("geolocation_id") REFERENCES "geolocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_geolocation_id_fkey" FOREIGN KEY ("geolocation_id") REFERENCES "geolocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_review" ADD CONSTRAINT "order_review_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_payment" ADD CONSTRAINT "order_payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
