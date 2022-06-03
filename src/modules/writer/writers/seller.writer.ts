import random_name from 'node-random-name';

import { rawString } from '@core/utils/string.util';
import { StartBarAspect } from '@writer/aspects/start-bar.aspect';
import { StopBarAspect } from '@core/aspects/stop-bar.aspect';
import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { PrismaService } from '@core/services/prisma.service';
import { SellerCSV } from '@reader/interfaces/seller.csv.interface';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Writer } from '@writer/classes/writer.class';


@Injectable()
export class SellerWriter extends Writer<SellerCSV> {

    constructor(
        prisma: PrismaService
    ) {
        super(prisma, 'seller');
    }

    map(
        items: SellerCSV[]
    ): Prisma.SellerCreateManyInput[] {
        return items.map((c) => {
            return {
                id: c.seller_id,
                name: random_name({ seed: c.seller_id }),
            };
        });
    }

    @UseAspect(Advice.After, StopBarAspect)
    async addGeolocation(
        items: SellerCSV[]
    ): Promise<void> {
        const map = this.getGeolocationSellerMap(items);

        for (const [key, value] of map) {
            const [city_codename, state, zip_code_prefix] = key.split('_');

            try {
                await this.prisma.geolocation.update({
                    data: {
                        sellers: {
                            connect: value
                        }
                    },
                    where: {
                        zip_code_prefix_city_codename_state: {
                            zip_code_prefix,
                            state,
                            city_codename,
                        },
                    },
                });
            } catch (e) { }

            this.bar.increment();
        }
    }

    @UseAspect(
        Advice.AfterReturn,
        StartBarAspect,
        { icon: '🌎', methodName: 'add-geolocation' }
    )
    private getGeolocationSellerMap(
        items: SellerCSV[]
    ): Map<string, { id: string }[]> {
        return new Map(Object.entries(
            items.reduce((obj, item) => {
                const index = `${rawString(item.seller_city)}_${item.seller_state}_${item.seller_zip_code_prefix}`;

                if (!obj[index]) {
                    obj[index] = [];
                }

                obj[index].push({
                    id: item.seller_id
                });

                return obj;
            }, {})
        ));
    }
}
