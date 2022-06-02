import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { MainModule } from '@main/main.module';
import { ReaderModule } from '@reader/reader.module';
import { WriterModule } from '@writer/writer.module';
import { CLIModule } from '@cli/cli.module';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { CommandModule } from 'nestjs-command';
import { locale } from '@src/locale';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        CLIModule,
        MainModule,
        ReaderModule,
        WriterModule,
        MorganModule,
        CommandModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        }),
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: MorganInterceptor('tiny'),
        },
    ],
})
export class AppModule {

    constructor() {
        locale();
    }
}
