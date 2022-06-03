import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Commander } from '@cli/classes/commander.class';
import { LogCommandAspect } from '@cli/aspects/log-command.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { SellerWriter } from '@writer/writers/seller.writer';
import { SellerReader } from '@reader/readers/seller.reader';
import { SellerCSV } from '@reader/interfaces/seller.csv.interface';


@Injectable()
export class SellerCommander extends Commander {

    constructor(
        private readonly reader: SellerReader,
        private readonly writer: SellerWriter,
    ) {
        super('seller');
    }

    @Command({
        command: 'init:seller',
        describe: 'Read, create and update Seller from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async init(): Promise<void> {
        const sellers = await this.reader.read();

        await this.create(sellers);
        await this.addGeolocation(sellers);
    }

    @Command({
        command: 'create:seller',
        describe: 'Read and create Seller from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async create(sellers?: SellerCSV[]): Promise<void> {
        sellers ??= await this.reader.read();
        await this.writer.create(sellers);
    }

    @Command({
        command: 'add-geolocation:seller',
        describe: 'Add Geolocation to Seller',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async addGeolocation(sellers?: SellerCSV[]): Promise<void> {
        sellers ??= await this.reader.read();
        await this.writer.addGeolocation(sellers);
    }
}
