import { PrismaService } from '@core/services/prisma.service';
import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { LogWriterAspect } from '@writer/aspects/log-writer.aspect';
import { SingleBar } from 'cli-progress';


export abstract class Writer<T> {

    data: any[];
    bar: SingleBar;

    constructor(
        protected readonly prisma: PrismaService,
        public readonly name: string
    ) {
        this.prisma = prisma;
        this.name = name;
        this.data = [];
    }

    abstract map(items: T[]): any[];

    @UseAspect(Advice.Before, LogWriterAspect)
    @UseAspect(Advice.After, LogWriterAspect)
    async create(items?: T[], skipDuplicates = true): Promise<void> {
        await this.prisma[this.name].createMany({
            data: this.map(items),
            skipDuplicates
        });
    };
}
