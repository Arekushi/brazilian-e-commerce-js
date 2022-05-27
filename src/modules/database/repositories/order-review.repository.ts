import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/services/prisma.service';
import { Repository } from '@core/classes/repository.class';


@Injectable()
export class OrderReviewRepository extends Repository {

    constructor(
        prisma: PrismaService
    ) {
        super('orderReview', prisma);
    }
}
