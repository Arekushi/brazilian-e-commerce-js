import { SwaggerConfig } from '@core/interfaces/swagger-config.interface';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


export const setupSwagger = (
    app: INestApplication,
    cfg: SwaggerConfig
) => {
    try {
        SwaggerModule.setup(cfg.route, app, createDocument(app, cfg));
    } catch (err) {
        console.log(err);
    }
};

const createDocument = (
    app: INestApplication,
    cfg: SwaggerConfig
) => {
    const documentConfig = new DocumentBuilder()
        .setTitle(cfg.title)
        .setDescription(cfg.description)
        .setVersion(cfg.version)
        .build();

    return SwaggerModule.createDocument(app, documentConfig);
};
