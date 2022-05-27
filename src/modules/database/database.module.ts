import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';

import { CustomerController } from '@database/controllers/customer.controller';

import { CustomerReader } from '@database/readers/customer.reader';
import { GeolocationReader } from '@database/readers/geolocation.reader';
import { OrderItemReader } from '@database/readers/order-item.reader';
import { OrderPaymentReader } from '@database/readers/order-payment.reader';
import { OrderReviewReader } from '@database/readers/order-review.reader';
import { OrderReader } from '@database/readers/order.reader';
import { ProductReader } from '@database/readers/product.reader';
import { SellerReader } from '@database/readers/seller.reader';

import { CustomerRepository } from '@database/repositories/customer.repository';
import { GeolocationRepository } from '@database/repositories/geolocation.repository';
import { OrderItemRepository } from '@database/repositories/order-item.repository';
import { OrderPaymentRepository } from '@database/repositories/order-payment.repository';
import { OrderReviewRepository } from '@database/repositories/order-review.repository';
import { OrderRepository } from '@database/repositories/order.repository';
import { ProductRepository } from '@database/repositories/product.repository';
import { SellerRepository } from '@database/repositories/seller.repository';

import { CustomerService } from '@database/services/customer.service';
import { GeolocationService } from '@database/services/geolocation.service';
import { OrderItemService } from '@database/services/order-item.service';
import { OrderPaymentService } from '@database/services/order-payment.service';
import { OrderReviewService } from '@database/services/order-review.service';
import { OrderService } from '@database/services/order.service';
import { ProductService } from '@database/services/product.service';
import { SellerService } from '@database/services/seller.service';


@Module({
    imports: [
        CoreModule
    ],
    controllers: [
        CustomerController
    ],
    providers: [
        CustomerReader,
        GeolocationReader,
        OrderItemReader,
        OrderPaymentReader,
        OrderReviewReader,
        OrderReader,
        ProductReader,
        SellerReader,
        CustomerRepository,
        GeolocationRepository,
        OrderItemRepository,
        OrderPaymentRepository,
        OrderReviewRepository,
        OrderRepository,
        ProductRepository,
        SellerRepository,
        CustomerService,
        GeolocationService,
        OrderItemService,
        OrderPaymentService,
        OrderReviewService,
        OrderService,
        ProductService,
        SellerService
    ],
})
export class DatabaseModule {}
