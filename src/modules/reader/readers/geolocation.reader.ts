import { Injectable } from '@nestjs/common';
import { GeolocationCSV } from '@reader/interfaces/geolocation.csv.interface';
import { ReaderCSV } from '@reader/classes/reader-csv.class';


@Injectable()
export class GeolocationReader extends ReaderCSV<GeolocationCSV> {

    constructor() {
        super({
            filename: 'olist_geolocation_dataset.csv',
            header: {
                geolocation_zip_code_prefix: 'STRING',
                geolocation_lat: 'FLOAT',
                geolocation_lng: 'FLOAT',
                geolocation_city: 'STRING',
                geolocation_state: 'STRING'
            }
        });
    }
}
