import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnersModule } from './partners/partners.module';
import { PromotionsModule } from './promotions/promotions.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PartnersModule,PromotionsModule,TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
