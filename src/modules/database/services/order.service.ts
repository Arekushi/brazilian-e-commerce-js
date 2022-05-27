import { OrderRepository } from '@database/repositories/order.repository';
import { Service } from '@core/classes/service.class';
import { Injectable } from '@nestjs/common';


@Injectable()
export class OrderService extends Service {

    constructor(
        public repository: OrderRepository
    ) {
        super(repository);
    }
}
