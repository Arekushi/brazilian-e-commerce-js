import consola from 'consola';

import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { AppModule } from '@src/app.module';


export const run = async (): Promise<void> => {
    const app = await NestFactory.createApplicationContext(AppModule, {
        logger: ['error']
    });

    try {
        await app
          .select(CommandModule)
          .get(CommandService)
          .exec();
        await app.close();
    } catch (error) {
        console.error(error);
        await app.close();
        process.exit(1);
    }
};

run().catch(
    (err) => {
        consola.error(err);
    }
);
