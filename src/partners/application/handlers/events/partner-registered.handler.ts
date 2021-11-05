import { PartnerRegisteredEvent } from '../../../domain/events/partner-registered.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

@EventsHandler(PartnerRegisteredEvent)
export class PartnerRegisteredHandler implements IEventHandler<PartnerRegisteredEvent> {
  constructor() {}

  handle(event: PartnerRegisteredEvent) {
    console.log('handle logic for PartnerRegisteredEvent');
    console.log(event);
  }
}