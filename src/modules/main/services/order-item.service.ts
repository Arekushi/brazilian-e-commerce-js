import { PrismaService } from '@core/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Service } from '@core/classes/service.class';


@Injectable()
export class OrderItemService extends Service {

    constructor(
        prisma: PrismaService
    ) {
        super(prisma, 'orderItem');
    }
}
