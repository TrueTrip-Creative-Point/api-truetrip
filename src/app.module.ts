import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnersModule } from './partners/partners.module';
import { TravelersModule } from './travelers/traveler.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PartnersModule,TravelersModule,TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
