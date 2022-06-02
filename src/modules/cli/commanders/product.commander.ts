import { Command } from 'nestjs-command';
import { LogCommandAspect } from '@cli/aspects/log-command.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Commander } from '@cli/classes/commander.class';
import { ProductWriter } from '@writer/writers/product.writer';
import { ProductReader } from '@reader/readers/product.reader';
import { Injectable } from '@nestjs/common';
import { ProductCSV } from '@reader/interfaces/product.csv.interface';


@Injectable()
export class ProductCommander extends Commander {

    constructor(
        private readonly reader: ProductReader,
        private readonly writer: ProductWriter,
    ) {
        super('product');
    }

    @Command({
        command: 'init:product',
        describe: 'Read, create and update Product from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async init(): Promise<void> {
        const products = await this.reader.read();

        await this.create(products);
        await this.addCategory(products);
    }

    @Command({
        command: 'create:product',
        describe: 'Read and create Product from CSV',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async create(products?: ProductCSV[]): Promise<void> {
        products ??= await this.reader.read();
        await this.writer.create(products);
    }

    @Command({
        command: 'add-category:product',
        describe: 'Add Category to Product',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async addCategory(products?: ProductCSV[]): Promise<void> {
        products ??= await this.reader.read();
        await this.writer.addCategory(products);
    }
}
