import { Service } from '@core/classes/service.class';
import { Injectable } from '@nestjs/common';


@Injectable()
export class OrderPaymentService extends Service {

    constructor() {
        super();
    }
}
