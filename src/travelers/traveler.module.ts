import { Module } from '@nestjs/common';
import { TravelersController } from './api/travelers.controller';
import { TravelersApplicationService } from './application/services/travelers-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterTravelerValidator } from './application/validators/register-traveler.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterTravelerHandler } from './application/handlers/commands/register-traveler.handler';
import { TravelerRegisteredHandler } from './application/handlers/events/traveler-registered.handler';
import { GetTravelersHandler } from './application/handlers/queries/get-travelers.handler';
import { TravelerTypeORM } from './infrastructure/persistence/typeorm/entities/traveler.typeorm';

export const CommandHandlers = [RegisterTravelerHandler];
export const EventHandlers = [TravelerRegisteredHandler];
export const QueryHandlers = [GetTravelersHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TravelerTypeORM]),
  ],
  controllers: [TravelersController],
  providers: [
    TravelersApplicationService,
    RegisterTravelerValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class TravelersModule {}