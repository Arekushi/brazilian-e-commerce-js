import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';

import { CustomerController } from '@main/controllers/customer.controller';
import { GeolocationController } from '@main/controllers/geolocation.controller';

import { CustomerService } from '@main/services/customer.service';
import { GeolocationService } from '@main/services/geolocation.service';
import { OrderItemService } from '@main/services/order-item.service';
import { OrderPaymentService } from '@main/services/order-payment.service';
import { OrderReviewService } from '@main/services/order-review.service';
import { OrderService } from '@main/services/order.service';
import { ProductService } from '@main/services/product.service';
import { SellerService } from '@main/services/seller.service';


@Module({
    imports: [
        CoreModule
    ],
    controllers: [
        CustomerController,
        GeolocationController
    ],
    providers: [
        CustomerService,
        GeolocationService,
        OrderItemService,
        OrderPaymentService,
        OrderReviewService,
        OrderService,
        ProductService,
        SellerService
    ],
    exports: [
        CustomerService,
        GeolocationService,
        OrderItemService,
        OrderPaymentService,
        OrderReviewService,
        OrderService,
        ProductService,
        SellerService
    ]
})
export class MainModule {}
