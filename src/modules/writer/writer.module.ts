import { Module } from '@nestjs/common';

import { MainModule } from '@main/main.module';
import { GeolocationWriter } from '@writer/writers/geolocation.writer';


@Module({
    imports: [
        MainModule
    ],
    controllers: [],
    providers: [
        GeolocationWriter
    ],
    exports: [
        GeolocationWriter
    ]
})
export class WriterModule {}
