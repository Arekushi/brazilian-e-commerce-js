import { Controller } from '@nestjs/common';
import { CustomerService } from '@database/services/customer.service';
import { BaseController } from '@core/classes/controller.class';


@Controller('customer')
export class CustomerController extends BaseController {

    constructor(
        service: CustomerService
    ) {
        super(service);
    }
}
