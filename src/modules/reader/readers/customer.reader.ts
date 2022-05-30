import { Injectable } from '@nestjs/common';
import { CustomerCSV } from '@reader/interfaces/customer.csv.interface';
import { ReaderCSV } from '@reader/classes/reader-csv.class';


@Injectable()
export class CustomerReader extends ReaderCSV<CustomerCSV> {

    constructor() {
        super({
            filename: 'olist_customers_dataset.csv',
            header: {
                customer_id: 'STRING',
                customer_unique_id: 'STRING',
                customer_zip_code_prefix: 'STRING',
                customer_city: 'STRING',
                customer_state: 'STRING'
            }
        });
    }
}
