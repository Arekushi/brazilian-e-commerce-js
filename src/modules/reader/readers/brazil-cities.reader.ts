import { BrazilCitiesCSV } from '@reader/interfaces/brazil-cities.csv.interface';
import { ReaderCSV } from '@reader/classes/reader-csv.class';


export class BrazilCitiesReader extends ReaderCSV<BrazilCitiesCSV> {

    constructor() {
        super({
            filename: 'BRAZIL_CITIES_REV2022.csv',
            header: {
                city: 'STRING'
            }
        });
    }
}
