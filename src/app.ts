import consola from 'consola';
import config from 'config';
import toBoolean from 'to-boolean';

import { SwaggerConfig } from '@core/interfaces/swagger-config.interface';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@src/app.module';
import { setupSwagger } from '@src/swagger';


export interface AppProps {
    url?: string;
    port?: number;
    swagger?: SwaggerConfig;
    globalPrefix?: string;
}

export class App {
    app: INestApplication;
    configService: ConfigService;
    props: AppProps;

    hasSwagger: boolean;

    constructor() {
        this.props = config.util.toObject(config.get('app'));
    }

    async init(): Promise<void> {
        this.app = await NestFactory.create(AppModule);
        this.app.setGlobalPrefix(this.props.globalPrefix);
        this.app.enableCors();

        this.configService = this.app.get(ConfigService);
        this.hasSwagger = toBoolean(this.configService.get('SWAGGER', 'FALSE'));
        this.props.port = this.configService.get<number>('PORT', this.props.port);
    }

    async listen(): Promise<void> {
        const { port, url, swagger, globalPrefix } = this.props;

        if (this.hasSwagger) {
            setupSwagger(this.app, swagger);
        }

        await this.app.listen(port, () => {
            consola.success(
                `Node Express server listening on ${url}:${port}/${globalPrefix}`
            );

            if (this.hasSwagger) {
                consola.success(
                    `Swagger API on ${url}:${port}/${swagger.route}`
                );
            }
        });
    }
}
