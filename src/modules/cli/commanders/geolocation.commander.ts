import { BrazilCitiesReader } from '@reader/readers/brazil-cities.reader';
import { GeolocationReader } from '@reader/readers/geolocation.reader';
import { GeolocationWriter } from '@writer/writers/geolocation.writer';
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';


@Injectable()
export class GeolocationCommander {

    constructor(
        private readonly reader: GeolocationReader,
        private readonly writer: GeolocationWriter,
        private readonly citiesReader: BrazilCitiesReader
    ) { }

    @Command({
        command: 'create:geolocation',
        describe: 'Read and create Geolocation from CSV',
    })
    async create(): Promise<void> {
        console.log('Começando...');

        console.log('Lendo geolocations...');
        const geolocations = await this.reader.read();

        console.log('Vamos inserir...');
        await this.writer.write(geolocations);

        console.log('Finalizado');
    }

    @Command({
        command: 'update-name:geolocation',
        describe: 'Update cities names from Geolocation',
    })
    async updateName(): Promise<void> {
        const cities = await this.citiesReader.read();
        console.log(cities);
        // await this.writer.updateName(cities);
    }
}
