import { Module } from '@nestjs/common';
import { PartnersController } from './api/partners.controller';
import { PartnersApplicationService } from './application/services/partners-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterPartnerValidator } from './application/validators/register-partner.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterPartnerHandler } from './application/handlers/commands/register-partner.handler';
import { PartnerRegisteredHandler } from './application/handlers/events/partner-registered.handler';
import { GetPartnersHandler } from './application/handlers/queries/get-partners.handler';
import { PartnerTypeORM } from './infrastructure/persistence/typeorm/entities/partner.typeorm';

export const CommandHandlers = [RegisterPartnerHandler];
export const EventHandlers = [PartnerRegisteredHandler];
export const QueryHandlers = [GetPartnersHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PartnerTypeORM]),
  ],
  controllers: [PartnersController],
  providers: [
    PartnersApplicationService,
    RegisterPartnerValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class PartnersModule {}