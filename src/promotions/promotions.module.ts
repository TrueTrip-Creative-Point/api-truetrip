import { Module } from '@nestjs/common';
import { CreatePromotionHandler } from './application/handlers/commands/create-promotion.handler';
import { PromotionCreatedHandler } from './application/handlers/events/promotion-created.handler';
import { GetPromotionsHandler } from './application/handlers/queries/get-promotions.handler';
import { PromotionTypeORM } from './infrastructure/persistence/typeorm/entities/promotion.typeorm';
import { PromotionsController } from './api/promotions.controller';
import { PromotionsApplicationService } from './application/services/promotions-application.service';
import { CreatePromotionValidator } from './application/validators/create-promotion.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

export const CommandHandlers = [CreatePromotionHandler];
export const EventHandlers = [PromotionCreatedHandler];
export const QueryHandlers = [GetPromotionsHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PromotionTypeORM]),
  ],
  controllers: [PromotionsController],
  providers: [
    PromotionsApplicationService,
    CreatePromotionValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class PromotionsModule{}