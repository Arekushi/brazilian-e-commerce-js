import { GeolocationRepository } from '@database/repositories/geolocation.repository';
import { Service } from '@core/classes/service.class';
import { Injectable } from '@nestjs/common';


@Injectable()
export class GeolocationService extends Service {

    constructor(
        public repository: GeolocationRepository
    ) {
        super(repository);
    }
}
