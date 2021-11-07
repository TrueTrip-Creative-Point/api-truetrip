import { TravelerRegisteredEvent } from '../../../domain/events/traveler-registered.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

@EventsHandler(TravelerRegisteredEvent)
export class TravelerRegisteredHandler implements IEventHandler<TravelerRegisteredEvent> {
  constructor() {}

  handle(event: TravelerRegisteredEvent) {
    console.log('handle logic for TravelerRegisteredEvent');
    console.log(event);
  }
}