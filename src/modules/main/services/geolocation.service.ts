import { Service } from '@core/classes/service.class';
import { Injectable } from '@nestjs/common';
import { GeolocationReader } from '@reader/readers/geolocation.reader';


@Injectable()
export class GeolocationService extends Service {

    constructor(
        public reader: GeolocationReader
    ) {
        super();
    }

    async insert(): Promise<void> {
        const geolocations = await this.reader.read();

        for (const geo of geolocations) {
            // await this.create({
            //     zip_code_prefix: geo.geolocation_zip_code_prefix,
            //     city: geo.geolocation_city,
            //     state: geo.geolocation_state,
            //     latitude: geo.geolocation_lat,
            //     longtude: geo.geolocation_lng
            // });
        }
    }
}
