import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { LogCommandAspect } from '@cli/aspects/log-command.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Commander } from '@cli/classes/commander.class';
import { OrderWriter } from '@writer/writers/order.writer';
import { OrderReader } from '@reader/readers/order.reader';
import { OrderCSV } from '@reader/interfaces/order.csv.interface';


@Injectable()
export class OrderCommander extends Commander {

    constructor(
        private readonly reader: OrderReader,
        private readonly writer: OrderWriter,
    ) {
        super('order');
    }

    @Command({
        command: 'init:order',
        describe: 'Read, create and update Order from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async init(): Promise<void> {
        const Orders = await this.reader.read();

        await this.create(Orders);
    }

    @Command({
        command: 'create:order',
        describe: 'Read and create Order from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async create(orders?: OrderCSV[]): Promise<void> {
        orders ??= await this.reader.read();
        await this.writer.create(orders);
    }
}
