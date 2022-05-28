import { Module } from '@nestjs/common';

import { CustomerReader } from './readers/customer.reader';
import { GeolocationReader } from './readers/geolocation.reader';
import { OrderItemReader } from './readers/order-item.reader';
import { OrderPaymentReader } from './readers/order-payment.reader';
import { OrderReviewReader } from './readers/order-review.reader';
import { OrderReader } from './readers/order.reader';
import { ProductReader } from './readers/product.reader';
import { SellerReader } from './readers/seller.reader';

@Module({
    imports: [],
    controllers: [],
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
    exports: [
        CustomerReader,
        GeolocationReader,
        OrderItemReader,
        OrderPaymentReader,
        OrderReviewReader,
        OrderReader,
        ProductReader,
        SellerReader,
    ]
})
export class ReaderModule {}
