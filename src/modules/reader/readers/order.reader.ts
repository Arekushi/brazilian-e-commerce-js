import { Injectable } from '@nestjs/common';
import { OrderCSV } from '@reader/interfaces/order.csv.interface';
import { ReaderCSV } from '@reader/classes/reader-csv.class';


@Injectable()
export class OrderReader extends ReaderCSV<OrderCSV> {

    constructor() {
        super(
            'olist_orders_dataset.csv',
            {
                order_id: 'STRING',
                customer_id: 'STRING',
                order_status: 'STRING',
                order_purchase_timestamp: 'DATE',
                order_approved_at: 'DATE',
                order_delivered_carrier_date: 'DATE',
                order_delivered_customer_date: 'DATE',
                order_estimated_delivery_date: 'DATE'
            }
        );
    }
}
