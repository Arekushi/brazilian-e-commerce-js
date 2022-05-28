import { Service } from '@core/classes/service.class';
import { Injectable } from '@nestjs/common';
import { CustomerReader } from '@reader/readers/customer.reader';


@Injectable()
export class CustomerService extends Service {

    constructor(
        public reader: CustomerReader
    ) {
        super();
    }

    // async read(): Promise<void> {
    //     const customers = await this.reader.read();

    //     customers.forEach(c => {
    //         this.repository.create({
    //             id: c.customer_id,
    //             unique_id: c.customer_unique_id
    //         });
    //     });
    // }
}
