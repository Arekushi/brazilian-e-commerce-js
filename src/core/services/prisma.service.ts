import { ExceptionActionAspect } from '@core/aspects/exception-action.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { PrismaClient } from '@prisma/client';
import {
    Injectable,
    OnModuleDestroy,
    OnModuleInit
} from '@nestjs/common';


@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    @UseAspect(Advice.TryCatch, ExceptionActionAspect)
    async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }
}
