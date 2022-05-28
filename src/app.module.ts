import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { MainModule } from '@main/main.module';
import { ReaderModule } from '@reader/reader.module';
import { MorganInterceptor, MorganModule } from 'nest-morgan';


const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    MainModule,
    ReaderModule,
    MorganModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('tiny'),
    },
  ],
})
export class AppModule { }
