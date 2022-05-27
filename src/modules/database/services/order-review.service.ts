import { OrderReviewRepository } from '@database/repositories/order-review.repository';
import { Service } from '@core/classes/service.class';
import { Injectable } from '@nestjs/common';


@Injectable()
export class OrderReviewService extends Service {

    constructor(
        public repository: OrderReviewRepository
    ) {
        super(repository);
    }
}
