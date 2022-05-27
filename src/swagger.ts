import config from 'config';

import { SwaggerConfig } from '@core/interfaces/swagger-config.interface';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


const cfg: SwaggerConfig = config.util.toObject(config.get('swagger'));

export const setupSwagger = (app: INestApplication) => {
    SwaggerModule.setup('api', app, createDocument(app));
};

export const createDocument = (app: INestApplication) => {
    return SwaggerModule.createDocument(
        app, new DocumentBuilder()
        .setTitle(cfg.title)
        .setDescription(cfg.description)
        .setVersion(cfg.version)
        .build()
    );
};
