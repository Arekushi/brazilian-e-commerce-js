import Case from 'case';

import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Writer } from '@writer/classes/writer.class';
import { PrismaService } from '@core/services/prisma.service';
import { GeolocationCSV } from '@reader/interfaces/geolocation.csv.interface';
import { BrazilCitiesCSV } from '@reader/interfaces/brazil-cities.csv.interface';
import { StartBarAspect } from '@writer/aspects/start-bar.aspect';
import { StopBarAspect } from '@core/aspects/stop-bar.aspect';
import { rawString } from '@core/utils/string.util';


@Injectable()
export class GeolocationWriter extends Writer<GeolocationCSV> {

    constructor(
        prisma: PrismaService
    ) {
        super(prisma, 'geolocation');
    }

    map(
        geolocations: GeolocationCSV[]
    ): Prisma.GeolocationCreateManyInput[] {
        return geolocations.map((geo) => {
            return {
                city: Case.capital(geo.geolocation_city),
                city_codename: rawString(geo.geolocation_city),
                latitude: geo.geolocation_lat,
                longitude: geo.geolocation_lng,
                state: geo.geolocation_state,
                zip_code_prefix: geo.geolocation_zip_code_prefix
            };
        });
    }

    @UseAspect(Advice.After, StopBarAspect)
    async updateName(
        cities: BrazilCitiesCSV[]
    ): Promise<void> {
        const map = this.getCitiesMap(cities);

        for (const [key, value] of map) {
            await this.prisma.geolocation.updateMany({
                where: {
                    city_codename: key
                },
                data: {
                    city: value
                },
            });

            this.bar.increment();
        }
    }

    @UseAspect(
        Advice.AfterReturn,
        StartBarAspect,
        { icon: '🔁', methodName: 'update-name' }
    )
    private getCitiesMap(cities: BrazilCitiesCSV[]): Map<string, string> {
        return new Map(cities.map(obj => {
            return [rawString(obj.city), obj.city];
        }));
    }
}
