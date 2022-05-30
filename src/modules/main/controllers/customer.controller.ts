import { Controller } from '@nestjs/common';
import { CustomerService } from '@main/services/customer.service';
import { BaseController } from '@core/classes/controller.class';
import { ApiTags } from '@nestjs/swagger';


@Controller('customer')
@ApiTags('Customer')
export class CustomerController extends BaseController {

    constructor(
        private readonly customerService: CustomerService
    ) {
        super(customerService);
    }
}
