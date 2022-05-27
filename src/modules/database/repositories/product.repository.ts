import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/services/prisma.service';
import { Repository } from '@core/classes/repository.class';


@Injectable()
export class ProductRepository extends Repository {

    constructor(
        prisma: PrismaService
    ) {
        super('product', prisma);
    }
}
