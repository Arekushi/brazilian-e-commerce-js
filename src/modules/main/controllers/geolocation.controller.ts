import { Controller, Get } from '@nestjs/common';
import { BaseController } from '@core/classes/controller.class';
import { GeolocationService } from '@main/services/geolocation.service';


@Controller('geolocation')
export class GeolocationController extends BaseController {

    constructor(
        private readonly geolocationService: GeolocationService
    ) {
        super(geolocationService);
    }

    @Get('/insert')
    async insert(): Promise<any[]> {
        await this.geolocationService.insert();

        return null;

        // return await this.geolocationService.repository.prisma.geolocation.findMany({
        //     orderBy: { state: 'desc' }
        // });
    }
}
