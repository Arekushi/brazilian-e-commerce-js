import { Repository } from '@core/classes/repository.class';


export abstract class Service {

    constructor(
        public repository: Repository
    ) {
        this.repository = repository;
    }

    async create(input: any): Promise<any> {
        return await this.repository.create(input);
    }
}
