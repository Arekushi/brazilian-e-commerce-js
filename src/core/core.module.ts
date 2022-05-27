import { Module } from '@nestjs/common';

import { HttpService } from '@core/services/http.service';
import { PrismaService } from '@core/services/prisma.service';
import { RequesterService } from '@core/services/requester.service';


@Module({
    imports: [],
    controllers: [],
    providers: [
        HttpService,
        PrismaService,
        RequesterService
    ],
    exports: [
        HttpService,
        PrismaService,
        RequesterService,
    ],
})
export class CoreModule {}
