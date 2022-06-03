import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { LogCommandAspect } from '@cli/aspects/log-command.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Commander } from '@cli/classes/commander.class';
import { OrderPaymentWriter } from '@writer/writers/order-payment.writer';
import { OrderPaymentReader } from '@reader/readers/order-payment.reader';
import { OrderPaymentCSV } from '@reader/interfaces/order-payment.csv.interface';


@Injectable()
export class OrderPaymentCommander extends Commander {

    constructor(
        private readonly reader: OrderPaymentReader,
        private readonly writer: OrderPaymentWriter,
    ) {
        super('orderPayment');
    }

    @Command({
        command: 'init:order-payment',
        describe: 'Read, create and update OrderPayment from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async init(): Promise<void> {
        const orderPayments = await this.reader.read();

        await this.create(orderPayments);
    }

    @Command({
        command: 'create:order-payment',
        describe: 'Read and create OrderPayment from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async create(orderPayments?: OrderPaymentCSV[]): Promise<void> {
        orderPayments ??= await this.reader.read();
        await this.writer.create(orderPayments);
    }
}
