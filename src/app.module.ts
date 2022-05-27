import { CoreModule } from '@core/core.module';
import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';


const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    MorganModule
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
