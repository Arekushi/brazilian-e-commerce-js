import { Module } from '@nestjs/common';

import { MainModule } from '@main/main.module';
import { GeolocationWriter } from '@writer/writers/geolocation.writer';
import { ProductWriter } from '@writer/writers/product.writer';


@Module({
    imports: [
        MainModule
    ],
    controllers: [],
    providers: [
        GeolocationWriter,
        ProductWriter
    ],
    exports: [
        GeolocationWriter,
        ProductWriter
    ]
})
export class WriterModule {}
