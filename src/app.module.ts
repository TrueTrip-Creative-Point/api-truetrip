import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnersModule } from './partners/partners.module';
import { PromotionsModule } from './promotions/promotions.module';
import { TravelersModule } from './travelers/traveler.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PartnersModule,PromotionsModule,TravelersModule,TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
