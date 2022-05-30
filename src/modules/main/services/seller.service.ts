import { PrismaService } from '@core/services/prisma.service';
import { Service } from '@core/classes/service.class';
import { Injectable } from '@nestjs/common';


@Injectable()
export class SellerService extends Service {

    constructor(
        prisma: PrismaService
    ) {
        super(prisma, 'seller');
    }
}
