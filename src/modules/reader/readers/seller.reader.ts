import { Injectable } from '@nestjs/common';
import { SellerCSV } from '@reader/interfaces/seller.csv.interface';
import { ReaderCSV } from '@reader/classes/reader-csv.class';


@Injectable()
export class SellerReader extends ReaderCSV<SellerCSV> {

    constructor() {
        super(
            'olist_sellers_dataset.csv',
            {
                seller_id: 'STRING',
                seller_zip_code_prefix: 'STRING',
                seller_city: 'STRING',
                seller_state: 'STRING'
            }
        );
    }
}
