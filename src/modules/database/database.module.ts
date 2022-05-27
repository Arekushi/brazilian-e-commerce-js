import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';

import { TestController } from '@database/controllers/test.controller';
import { CustomerReader } from '@database/readers/customer.reader';
import { GeolocationReader } from '@database/readers/geolocation.reader';
import { OrderItemReader } from '@database/readers/order-item.reader';
import { OrderPaymentReader } from '@database/readers/order-payment.reader';
import { OrderReviewReader } from '@database/readers/order-review.reader';
import { OrderReader } from '@database/readers/order.reader';
import { ProductReader } from '@database/readers/product.reader';
import { SellerReader } from '@database/readers/seller.reader';


@Module({
    imports: [
        CoreModule
    ],
    controllers: [
        TestController
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
    ],
})
export class DatabaseModule {}
