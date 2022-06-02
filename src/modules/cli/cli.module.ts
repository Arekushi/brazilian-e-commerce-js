import { Module } from '@nestjs/common';

import { CoreModule } from '@core/core.module';
import { ReaderModule } from '@reader/reader.module';
import { WriterModule } from '@writer/writer.module';
import { GeolocationCommander } from '@cli/commanders/geolocation.commander';
import { DatasetsCommander } from '@cli/commanders/datasets.commander';
import { ProductCommander } from '@cli/commanders/product.commander';


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
        ProductCommander
    ],
})
export class CLIModule {}
