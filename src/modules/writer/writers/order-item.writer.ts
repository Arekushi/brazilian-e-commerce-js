import { PrismaService } from '@core/services/prisma.service';
import { OrderItemCSV } from '@reader/interfaces/order-item.csv.interface';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Writer } from '@writer/classes/writer.class';


@Injectable()
export class OrderItemWriter extends Writer<OrderItemCSV> {

    constructor(
        prisma: PrismaService
    ) {
        super(prisma, 'orderItem');
    }

    map(
        items: OrderItemCSV[]
    ): Prisma.OrderItemCreateManyInput[] {
        return items.map((o) => {
            return {
                order_item_id: o.order_item_id,
                order_id: o.order_id,
                product_id: o.product_id,
                seller_id: o.seller_id,
                freight_value: o.freight_value,
                price: o.price,
                shipping_limit_date: o.shipping_limit_date
            };
        });
    }
}
