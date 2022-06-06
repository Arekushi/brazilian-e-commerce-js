import random_name from 'node-random-name';

import { rawString } from '@core/utils/string.util';
import { StartBarAspect } from '@writer/aspects/start-bar.aspect';
import { StopBarAspect } from '@core/aspects/stop-bar.aspect';
import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { PrismaService } from '@core/services/prisma.service';
import { CustomerCSV } from '@reader/interfaces/customer.csv.interface';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Writer } from '@writer/classes/writer.class';
import { randomDate } from '@core/utils/date.util';
import { randomGender } from '@core/utils/random.util';


@Injectable()
export class CustomerWriter extends Writer<CustomerCSV> {

    constructor(
        prisma: PrismaService
    ) {
        super(prisma, 'customer');
    }

    map(
        items: CustomerCSV[]
    ): Prisma.CustomerCreateManyInput[] {
        return items.map((c) => {
            return {
                id: c.customer_id,
                name: random_name({ seed: c.customer_id }),
                birth_date: randomDate(new Date(1982, 1, 1), new Date(2005, 1, 1), c.customer_id),
                gender: randomGender(c.customer_id)
            };
        });
    }

    @UseAspect(Advice.After, StopBarAspect)
    async addGeolocation(
        items: CustomerCSV[]
    ): Promise<void> {
        const map = this.getGeolocationCustomerMap(items);

        for (const [key, value] of map) {
            const [city_codename, state, zip_code_prefix] = key.split('_');

            try {
                await this.prisma.geolocation.update({
                    data: {
                        customers: {
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
    private getGeolocationCustomerMap(
        items: CustomerCSV[]
    ): Map<string, { id: string }[]> {
        return new Map(Object.entries(
            items.reduce((obj, item) => {
                const index = `${rawString(item.customer_city)}_${item.customer_state}_${item.customer_zip_code_prefix}`;

                if (!obj[index]) {
                    obj[index] = [];
                }

                obj[index].push({
                    id: item.customer_id
                });

                return obj;
            }, {})
        ));
    }
}
