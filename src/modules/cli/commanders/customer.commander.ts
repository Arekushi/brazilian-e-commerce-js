import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Commander } from '@cli/classes/commander.class';
import { LogCommandAspect } from '@cli/aspects/log-command.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { CustomerWriter } from '@writer/writers/customer.writer';
import { CustomerReader } from '@reader/readers/customer.reader';
import { CustomerCSV } from '@reader/interfaces/customer.csv.interface';


@Injectable()
export class CustomerCommander extends Commander {

    constructor(
        private readonly reader: CustomerReader,
        private readonly writer: CustomerWriter,
    ) {
        super('customer');
    }

    @Command({
        command: 'init:customer',
        describe: 'Read, create and update Customer from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async init(): Promise<void> {
        const Customers = await this.reader.read();

        await this.create(Customers);
        await this.addGeolocation(Customers);
    }

    @Command({
        command: 'create:customer',
        describe: 'Read and create Customer from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async create(customers?: CustomerCSV[]): Promise<void> {
        customers ??= await this.reader.read();
        await this.writer.create(customers);
    }

    @Command({
        command: 'add-geolocation:customer',
        describe: 'Add Geolocation to Customer',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async addGeolocation(customers?: CustomerCSV[]): Promise<void> {
        customers ??= await this.reader.read();
        await this.writer.addGeolocation(customers);
    }
}
