import { Module } from '@nestjs/common';

import { ReaderModule } from '@reader/reader.module';
import { WriterModule } from '@writer/writer.module';
import { GeolocationCommander } from '@cli/commanders/geolocation.commander';


@Module({
    imports: [
        ReaderModule,
        WriterModule
    ],
    controllers: [],
    providers: [
        GeolocationCommander
    ],
})
export class CLIModule {}
