import { Service } from '@core/classes/service.class';
import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { CheckDataAspect } from '@writer/aspects/check-data.aspect';
import { LogWriterAspect } from '@writer/aspects/log-writer.aspect';
import { SingleBar } from 'cli-progress';


export abstract class Writer<T> {

    data: any[];
    bar: SingleBar;

    constructor(
        protected readonly service: Service,
        public readonly name: string
    ) {
        this.service = service;
        this.name = name;
        this.data = [];
    }

    abstract map(items: T[]): any[];

    @UseAspect(Advice.Before, LogWriterAspect)
    @UseAspect(Advice.Before, CheckDataAspect)
    @UseAspect(Advice.After, LogWriterAspect)
    async create(items?: T[]): Promise<void> {
        await this.service.createMany(this.data, true);
    };
}
