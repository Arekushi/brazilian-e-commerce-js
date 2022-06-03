import { PrismaService } from '@core/services/prisma.service';
import { OrderReviewCSV } from '@reader/interfaces/order-review.csv.interface';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Writer } from '@writer/classes/writer.class';


@Injectable()
export class OrderReviewWriter extends Writer<OrderReviewCSV> {

    constructor(
        prisma: PrismaService
    ) {
        super(prisma, 'orderReview');
    }

    map(
        items: OrderReviewCSV[]
    ): Prisma.OrderReviewCreateManyInput[] {
        return items.map((o) => {
            return {
                id: o.review_id,
                order_id: o.order_id,
                score: o.review_score,
                comment_title: o.review_comment_title,
                comment_message: o.review_comment_message,
                creation_date: o.review_creation_date,
                answer_date: o.review_answer_timestamp,
            };
        });
    }
}
