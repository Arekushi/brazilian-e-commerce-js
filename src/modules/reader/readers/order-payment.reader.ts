import { Injectable } from '@nestjs/common';
import { OrderPaymentCSV } from '@reader/interfaces/order-payment.csv.interface';
import { ReaderCSV } from '@reader/classes/reader-csv.class';


@Injectable()
export class OrderPaymentReader extends ReaderCSV<OrderPaymentCSV> {

    constructor() {
        super({
            filename: 'olist_order_payments_dataset.csv',
            header: {
                order_id: 'STRING',
                payment_sequential: 'INT',
                payment_type: 'STRING',
                payment_installments: 'INT',
                payment_value: 'FLOAT'
            }
        });
    }
}
