import { Service } from '@core/classes/service.class';


export abstract class Writer<T> {

    constructor(
        protected readonly service: Service
    ) {
        this.service = service;
    }

    abstract write(items: T[], ...any: any): void;
}
