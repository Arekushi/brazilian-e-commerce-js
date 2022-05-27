import { OrderItemRepository } from '@database/repositories/order-item.repository';
import { Service } from '@core/classes/service.class';
import { Injectable } from '@nestjs/common';


@Injectable()
export class OrderItemService extends Service {

    constructor(
        public repository: OrderItemRepository
    ) {
        super(repository);
    }
}
