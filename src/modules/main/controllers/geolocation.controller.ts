import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { BaseController } from '@core/classes/controller.class';
import { GeolocationService } from '@main/services/geolocation.service';


@Controller('geolocation')
@ApiTags('Geolocation')
export class GeolocationController extends BaseController {

    constructor(
        private readonly geolocationService: GeolocationService
    ) {
        super(geolocationService);
    }
}
