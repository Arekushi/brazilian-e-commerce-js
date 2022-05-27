import { Injectable } from '@nestjs/common';
import { GeolocationCSV } from '@database/interfaces/geolocation.csv.interface';
import { ReaderCSV } from '@database/classes/reader-csv.class';


@Injectable()
export class GeolocationReader extends ReaderCSV<GeolocationCSV> {

    constructor() {
        super(
            'olist_geolocation_dataset.csv',
            {
                geolocation_zip_code_prefix: 'STRING',
                geolocation_lat: 'FLOAT',
                geolocation_lng: 'FLOAT',
                geolocation_city: 'STRING',
                geolocation_state: 'STRING'
            }
        );
    }
}
