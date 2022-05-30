import { Injectable } from '@nestjs/common';
import { OrderReviewCSV } from '@reader/interfaces/order-review.csv.interface';
import { ReaderCSV } from '@reader/classes/reader-csv.class';


@Injectable()
export class OrderReviewReader extends ReaderCSV<OrderReviewCSV> {

    constructor() {
        super({
            filename: 'olist_order_reviews_dataset.csv',
            header: {
                review_id: 'STRING',
                order_id: 'STRING',
                review_score: 'INT',
                review_comment_title: 'STRING',
                review_comment_message: 'STRING',
                review_creation_date: 'DATE',
                review_answer_timestamp: 'DATE'
            }
        });
    }
}
