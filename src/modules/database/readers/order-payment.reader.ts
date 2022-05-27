import { Injectable } from '@nestjs/common';
import { OrderPaymentCSV } from '@database/interfaces/order-payment.csv.interface';
import { ReaderCSV } from '@database/classes/reader-csv.class';


@Injectable()
export class OrderPaymentReader extends ReaderCSV<OrderPaymentCSV> {

    constructor() {
        super(
            'olist_order_payments_dataset.csv',
            {
                order_id: 'STRING',
                payment_sequential: 'INT',
                payment_type: 'STRING',
                payment_installments: 'INT',
                payment_value: 'FLOAT'
            }
        );
    }
}
