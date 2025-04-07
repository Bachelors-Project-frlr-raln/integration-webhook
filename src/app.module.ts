import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RetailModule } from './retail/retail.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AxiosHttpService } from './http/axios-http.service';
import { OnSearchController } from './controllers/on_search.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RetailModule,
    HttpModule,
  ],
  controllers: [AppController, OnSearchController],
  providers: [AxiosHttpService, AppService],
})
export class AppModule {}
