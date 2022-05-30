import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { MainModule } from '@main/main.module';
import { ReaderModule } from '@reader/reader.module';
import { WriterModule } from './modules/writer/writer.module';
import { CLIModule } from '@cli/cli.module';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { CommandModule } from 'nestjs-command';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        CLIModule,
        MainModule,
        ReaderModule,
        WriterModule,
        MorganModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        }),
        CommandModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: MorganInterceptor('tiny'),
        },
    ],
})
export class AppModule {}
