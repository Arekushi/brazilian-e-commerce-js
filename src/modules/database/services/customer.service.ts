import { CustomerRepository } from '@database/repositories/customer.repository';
import { Service } from '@core/classes/service.class';
import { Injectable } from '@nestjs/common';


@Injectable()
export class CustomerService extends Service {

    constructor(
        public repository: CustomerRepository
    ) {
        super(repository);
    }
}
