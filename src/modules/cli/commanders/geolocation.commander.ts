import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { LogCommandAspect } from '@cli/aspects/log-command.aspect';
import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { BrazilCitiesReader } from '@reader/readers/brazil-cities.reader';
import { GeolocationReader } from '@reader/readers/geolocation.reader';
import { GeolocationWriter } from '@writer/writers/geolocation.writer';
import { Commander } from '@cli/classes/commander.class';


@Injectable()
export class GeolocationCommander extends Commander {

    constructor(
        private readonly reader: GeolocationReader,
        private readonly writer: GeolocationWriter,
        private readonly citiesReader: BrazilCitiesReader
    ) {
        super('geolocation');
    }

    @Command({
        command: 'init:geolocation',
        describe: 'Read, create and update Geolocation from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async init(): Promise<void> {
        await this.create();
        await this.updateName();
    }

    @Command({
        command: 'create:geolocation',
        describe: 'Read and create Geolocation from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async create(): Promise<void> {
        const geolocations = await this.reader.read();
        await this.writer.create(geolocations);
    }

    @Command({
        command: 'update-name:geolocation',
        describe: 'Update cities names from Geolocation',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async updateName(): Promise<void> {
        const cities = await this.citiesReader.read();
        await this.writer.updateName(cities);
    }
}
