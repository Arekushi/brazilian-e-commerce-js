import { Module } from '@nestjs/common';

import { CoreModule } from '@core/core.module';
import { ReaderModule } from '@reader/reader.module';
import { WriterModule } from '@writer/writer.module';
import { GeolocationCommander } from '@cli/commanders/geolocation.commander';
import { DatasetsCommander } from '@cli/commanders/datasets.commander';
import { ProductCommander } from '@cli/commanders/product.commander';
import { CustomerCommander } from '@cli/commanders/customer.commander';
import { SellerCommander } from '@cli/commanders/seller.commander';
import { OrderCommander } from '@cli/commanders/order.commander';
import { OrderReviewCommander } from '@cli/commanders/order-review.commander';
import { OrderPaymentCommander } from '@cli/commanders/order-payment.commander';
import { OrderItemCommander } from '@cli/commanders/order-item.commander';
import { MainCommander } from '@cli/commanders/main.commander';


@Module({
    imports: [
        CoreModule,
        ReaderModule,
        WriterModule
    ],
    controllers: [],
    providers: [
        GeolocationCommander,
        DatasetsCommander,
        ProductCommander,
        CustomerCommander,
        SellerCommander,
        OrderCommander,
        OrderItemCommander,
        OrderPaymentCommander,
        OrderReviewCommander,
        MainCommander
    ],
})
export class CLIModule {}
