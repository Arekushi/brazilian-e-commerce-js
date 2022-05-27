import consola from 'consola';
import config from 'config';
import toBoolean from 'to-boolean';

import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@src/app.module';
import { setupSwagger } from '@src/swagger';


export class App {
    app: INestApplication;
    configService: ConfigService;
    port: number;

    async init(): Promise<void> {
        this.app = await NestFactory.create(AppModule);
        this.app.enableCors();
        this.app.getHttpServer();

        this.configService = this.app.get(ConfigService);
        this.port = this.getPort();

        if (toBoolean(this.configService.get('SWAGGER', 'FALSE'))) {
            setupSwagger(this.app);
        }
    }

    getPort(): number {
        return parseInt(this.configService.get('PORT') ?? config.get('PORT'), 10);
    }

    async listen(): Promise<void> {
        await this.app.listen(this.port, () => {
            consola.success(
                `Node Express server listening on http://localhost:${this.port}`
            );

            consola.success(
                `Swagger API on http://localhost:${this.port}/api`
            );
        });
    }
}
