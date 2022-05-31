import { Module } from '@nestjs/common';

import { HttpService } from '@core/services/http.service';
import { PrismaService } from '@core/services/prisma.service';
import { RequesterService } from '@core/services/requester.service';
import { UnzipService } from '@core/services/unzip.service';


@Module({
    imports: [],
    controllers: [],
    providers: [
        HttpService,
        PrismaService,
        RequesterService,
        UnzipService
    ],
    exports: [
        HttpService,
        PrismaService,
        RequesterService,
        UnzipService
    ],
})
export class CoreModule {}
