import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { LogCommandAspect } from '@cli/aspects/log-command.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Commander } from '@cli/classes/commander.class';
import { OrderReviewWriter } from '@writer/writers/order-review.writer';
import { OrderReviewReader } from '@reader/readers/order-review.reader';
import { OrderReviewCSV } from '@reader/interfaces/order-review.csv.interface';


@Injectable()
export class OrderReviewCommander extends Commander {

    constructor(
        private readonly reader: OrderReviewReader,
        private readonly writer: OrderReviewWriter,
    ) {
        super('orderReview');
    }

    @Command({
        command: 'init:order-review',
        describe: 'Read, create and update OrderReview from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async init(): Promise<void> {
        const orderReviews = await this.reader.read();

        await this.create(orderReviews);
    }

    @Command({
        command: 'create:order-review',
        describe: 'Read and create OrderReview from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async create(orderReviews?: OrderReviewCSV[]): Promise<void> {
        orderReviews ??= await this.reader.read();
        await this.writer.create(orderReviews);
    }
}
