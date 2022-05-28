import { Injectable } from '@nestjs/common';
import { OrderItemCSV } from '@reader/interfaces/order-item.csv.interface';
import { ReaderCSV } from '@reader/classes/reader-csv.class';


@Injectable()
export class OrderItemReader extends ReaderCSV<OrderItemCSV> {

    constructor() {
        super(
            'olist_order_items_dataset.csv',
            {
                order_id: 'STRING',
                order_item_id: 'STRING',
                product_id: 'STRING',
                seller_id: 'STRING',
                shipping_limit_date: 'DATE',
                price: 'FLOAT',
                freight_value: 'FLOAT'
            }
        );
    }
}
