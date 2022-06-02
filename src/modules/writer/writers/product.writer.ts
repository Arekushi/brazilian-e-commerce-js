import { StartBarAspect } from '@writer/aspects/start-bar.aspect';
import { StopBarAspect } from '@core/aspects/stop-bar.aspect';
import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { ProductService } from '@main/services/product.service';
import { ProductCSV } from '@reader/interfaces/product.csv.interface';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Writer } from '@writer/classes/writer.class';


@Injectable()
export class ProductWriter extends Writer<ProductCSV> {

    constructor(
        service: ProductService
    ) {
        super(service, 'product');
    }

    map(
        items: ProductCSV[]
    ): Prisma.ProductCreateManyInput[] {
        return items.map((p) => {
            return {
                id: p.product_id,
                description_lenght: p.product_description_lenght,
                height_cm: p.product_height_cm,
                length_cm: p.product_length_cm,
                name_lenght: p.product_name_lenght,
                photos_quantity: p.product_photos_qty,
                weight_g: p.product_weight_g,
                width_cm: p.product_width_cm,
            };
        });
    }

    @UseAspect(Advice.After, StopBarAspect)
    async addCategory(
        items: ProductCSV[]
    ): Promise<void> {
        const map = this.getCategoryMap(items);

        for (const [key, value] of map) {
            await this.service.prisma.productCategory.create({
                data: {
                    name: key,
                    products: {
                        connect: value
                    }
                },
            });

            this.bar.increment();
        }
    }

    @UseAspect(
        Advice.AfterReturn,
        StartBarAspect,
        { icon: '➕', methodName: 'add-category' }
    )
    private getCategoryMap(
        items: ProductCSV[]
    ): Map<string, { id: string }[]> {
        return new Map(Object.entries(
            items.reduce((obj, item) => {
                if (!obj[item.product_category_name]) {
                    obj[item.product_category_name] = [];
                }

                obj[item.product_category_name].push(
                    {
                        id: String(item.product_id)
                    }
                );

                return obj;
             }, {})
        ));
    }
}
