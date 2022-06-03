import { PrismaService } from '@core/services/prisma.service';
import { OrderPaymentCSV } from '@reader/interfaces/order-payment.csv.interface';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Writer } from '@writer/classes/writer.class';


@Injectable()
export class OrderPaymentWriter extends Writer<OrderPaymentCSV> {

    constructor(
        prisma: PrismaService
    ) {
        super(prisma, 'orderPayment');
    }

    map(
        items: OrderPaymentCSV[]
    ): Prisma.OrderPaymentCreateManyInput[] {
        return items.map((o) => {
            return {
                order_id: o.order_id,
                installments: o.payment_installments,
                sequential: o.payment_sequential,
                type: o.payment_type,
                value: o.payment_value
            };
        });
    }
}
