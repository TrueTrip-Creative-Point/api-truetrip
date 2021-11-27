// @ts-ignore

import { RegisterTravelPackageHandler } from "./application/handlers/commands/register-travelPackage.handler";
import { TravelPackageRegisteredHandler } from "./application/handlers/events/travel-package-registered.handler";
import { GetTravelPackageHandler } from "./application/handlers/queries/get-travel-package.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TravelPackageTypeORM } from "./infrastructure/persistence/typeorm/entities/travelPackage";
import { TripPlansController } from "./api/trip-plans.controller";
import { Module } from "@nestjs/common";
import { TravelPackageApplicationService } from "./application/services/travel-package-application.service";
import { RegisterTravelPackageValidator } from "./application/validators/travelPackage.validator";
import { DestinationTypeORM } from "./infrastructure/persistence/typeorm/entities/destination.typeorm";
import { DeleteTravelPackageHandler } from './application/handlers/commands/deleteTravelPackage.handler';
import { UpdateTravelPackageHandler } from './application/handlers/commands/editTravelPackage.handler';

export const CommandHandlers=[RegisterTravelPackageHandler,DeleteTravelPackageHandler,UpdateTravelPackageHandler];
export const EventHandlers=[TravelPackageRegisteredHandler];
export const QueryHandlers=[GetTravelPackageHandler];

@Module({
  imports:[
    CqrsModule,
    TypeOrmModule.forFeature([TravelPackageTypeORM, DestinationTypeORM])
  ],
  controllers:[TripPlansController],
  providers:[
  TravelPackageApplicationService,
  RegisterTravelPackageValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class TravelPackageModule{}
