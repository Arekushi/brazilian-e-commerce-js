import { HttpService } from '@core/services/http.service';
import { PrismaService } from '@core/services/prisma.service';
import { Module } from '@nestjs/common';


@Module({
    imports: [],
    controllers: [],
    providers: [
        HttpService,
        PrismaService
    ],
    exports: [
        HttpService,
        PrismaService
    ],
})
export class CoreModule {}
