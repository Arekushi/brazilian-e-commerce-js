import removeAccents from 'remove-accents';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Writer } from '@writer/classes/writer.class';
import { GeolocationService } from '@main/services/geolocation.service';
import { GeolocationCSV } from '@reader/interfaces/geolocation.csv.interface';
import { BrazilCitiesCSV } from '@reader/interfaces/brazil-cities.csv.interface';
import { onlyAlpha } from '@core/utils/string.util';


@Injectable()
export class GeolocationWriter extends Writer<GeolocationCSV> {

    constructor(
        service: GeolocationService
    ) {
        super(service);
    }

    map(
        geolocations: GeolocationCSV[]
    ): Prisma.GeolocationCreateManyInput[] {
        return geolocations.map((geo) => {
            return {
                city: this.transformCityName(geo.geolocation_city),
                latitude: geo.geolocation_lat,
                longitude: geo.geolocation_lng,
                state: geo.geolocation_state,
                zip_code_prefix: geo.geolocation_zip_code_prefix
            };
        });
    }

    async updateName(
        cities: BrazilCitiesCSV[]
    ): Promise<void> {
        const citiesMap = new Map(cities.map(obj => {
            return [this.transformCityName(obj.city), obj.city];
        }));

        for (const [key, value] of citiesMap) {
            await this.service.prisma.geolocation.updateMany({
                where: {
                    city: key
                },
                data: {
                    city: value
                },
            });
        }
    }

    private transformCityName(city: string): string {
        return onlyAlpha(removeAccents(city)).toLocaleLowerCase();
    }
}
