import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/services/prisma.service';
import { Repository } from '@core/classes/repository.class';


@Injectable()
export class OrderItemRepository extends Repository {

    constructor(
        prisma: PrismaService
    ) {
        super('orderItem', prisma);
    }
}
