import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { LogCommandAspect } from '@cli/aspects/log-command.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Commander } from '@cli/classes/commander.class';
import { OrderItemWriter } from '@writer/writers/order-item.writer';
import { OrderItemReader } from '@reader/readers/order-item.reader';
import { OrderItemCSV } from '@reader/interfaces/order-item.csv.interface';


@Injectable()
export class OrderItemCommander extends Commander {

    constructor(
        private readonly reader: OrderItemReader,
        private readonly writer: OrderItemWriter,
    ) {
        super('orderItem');
    }

    @Command({
        command: 'init:order-item',
        describe: 'Read, create and update OrderItem from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async init(): Promise<void> {
        const orderItems = await this.reader.read();

        await this.create(orderItems);
    }

    @Command({
        command: 'create:order-item',
        describe: 'Read and create OrderItem from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async create(orderItems?: OrderItemCSV[]): Promise<void> {
        orderItems ??= await this.reader.read();
        await this.writer.create(orderItems);
    }
}
