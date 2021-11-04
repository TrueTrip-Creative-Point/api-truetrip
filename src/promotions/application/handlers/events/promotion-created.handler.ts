
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { PromotionRegisteredEvent } from '../../../domain/events/promotion-registered.event';

@EventsHandler(PromotionRegisteredEvent)
export class PromotionCreatedHandler implements IEventHandler<PromotionRegisteredEvent> {
  constructor() {}
  handle(event: PromotionRegisteredEvent) {
    console.log('handle logic for PartnerRegisteredEvent');
    console.log(event);
  }
}