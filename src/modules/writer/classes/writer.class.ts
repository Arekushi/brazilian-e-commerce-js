import { Service } from '@core/classes/service.class';
import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { CheckDataAspect } from '@writer/aspects/check-data.aspect';


export abstract class Writer<T> {

    data: any[];

    constructor(
        protected readonly service: Service
    ) {
        this.service = service;
        this.data = [];
    }

    abstract map(items: T[]): any[];

    @UseAspect(Advice.Before, CheckDataAspect)
    async write(items?: T[]): Promise<void> {
        await this.service.createMany(this.data);
    };
}
