import { Injectable } from '@nestjs/common';
import { CustomerCSV } from '@database/interfaces/customer.csv.interface';
import { ReaderCSV } from '@database/classes/reader-csv.class';


@Injectable()
export class CustomerReader extends ReaderCSV<CustomerCSV> {

    constructor() {
        super(
            'olist_customers_dataset.csv',
            {
                customer_id: 'STRING',
                customer_unique_id: 'STRING',
                customer_zip_code_prefix: 'STRING',
                customer_city: 'STRING',
                customer_state: 'STRING'
            }
        );
    }
}
