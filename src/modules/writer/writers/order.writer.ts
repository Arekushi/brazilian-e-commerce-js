import { PrismaService } from '@core/services/prisma.service';
import { OrderCSV } from '@reader/interfaces/order.csv.interface';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Writer } from '@writer/classes/writer.class';


@Injectable()
export class OrderWriter extends Writer<OrderCSV> {

    constructor(
        prisma: PrismaService
    ) {
        super(prisma, 'order');
    }

    map(
        items: OrderCSV[]
    ): Prisma.OrderCreateManyInput[] {
        return items.map((o) => {
            return {
                id: o.order_id,
                status: o.order_status,
                customer_id: o.customer_id,
                purchase_timestamp: o.order_purchase_timestamp,
                approved_at: o.order_approved_at,
                delivered_carrier_date: o.order_delivered_carrier_date,
                delivered_customer_date: o.order_delivered_customer_date,
                estimated_delivery_date: o.order_estimated_delivery_date
            };
        });
    }
}
