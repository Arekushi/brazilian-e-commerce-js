import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';

import { GeolocationWriter } from '@writer/writers/geolocation.writer';
import { ProductWriter } from '@writer/writers/product.writer';
import { CustomerWriter } from '@writer/writers/customer.writer';
import { SellerWriter } from '@writer/writers/seller.writer';
import { OrderWriter } from '@writer/writers/order.writer';
import { OrderItemWriter } from '@writer/writers/order-item.writer';
import { OrderPaymentWriter } from '@writer/writers/order-payment.writer';
import { OrderReviewWriter } from '@writer/writers/order-review.writer';


@Module({
    imports: [
        CoreModule
    ],
    controllers: [],
    providers: [
        GeolocationWriter,
        ProductWriter,
        CustomerWriter,
        SellerWriter,
        OrderWriter,
        OrderItemWriter,
        OrderPaymentWriter,
        OrderReviewWriter
    ],
    exports: [
        GeolocationWriter,
        ProductWriter,
        CustomerWriter,
        SellerWriter,
        OrderWriter,
        OrderItemWriter,
        OrderPaymentWriter,
        OrderReviewWriter
    ]
})
export class WriterModule {}
