import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TravelPackageEvent } from "../../../domain/events/travel-package.event";

@EventsHandler(TravelPackageEvent)
export class TravelPackageRegisteredHandler implements IEventHandler<TravelPackageEvent> {
  constructor() {}

  handle(event: TravelPackageEvent) {
    console.log('handle logic for TravelPackageRegisteredEvent');
    console.log(event);
  }
}
