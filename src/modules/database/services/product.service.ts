import { ProductRepository } from '@database/repositories/product.repository';
import { Service } from '@core/classes/service.class';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ProductService extends Service {

    constructor(
        public repository: ProductRepository
    ) {
        super(repository);
    }
}
