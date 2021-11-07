// @ts-ignore

import { RegisterTravelPackageHandler } from "./application/handlers/TravelPackage/commands/register-travelPackage.handler";
import { TravelPackageRegisteredHandler } from "./application/handlers/TravelPackage/events/travel-package-registered.handler";
import { GetTravelPackageHandler } from "./application/handlers/TravelPackage/queries/get-travel-package.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TravelPackageTypeORM } from "./infraestracture/persistence/typeorm/entities/TravelPackage/travelPackage";
import { TripPlansController } from "./api/trip-plans.controller";
import { Module } from "@nestjs/common";
import { TravelPackageApplicationService } from "./application/services/TravelPackage/travel-package-application.service";
import { RegisterTravelPackageValidator } from "./application/validators/TravelPackage/travelPackage.validator";


export const CommandHandlers=[RegisterTravelPackageHandler];
export const EventHandlers=[TravelPackageRegisteredHandler];
export const QueryHandlers=[GetTravelPackageHandler];

@Module({
  imports:[
    CqrsModule,
    TypeOrmModule.forFeature([TravelPackageTypeORM])
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
