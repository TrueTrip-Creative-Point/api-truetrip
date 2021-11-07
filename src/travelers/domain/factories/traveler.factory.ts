import { Traveler } from '../entities/traveler.entity';
import { TravelerId } from '../value-objects/traveler-id.value';
import { Dni } from '../value-objects/dni.value';

import { PhoneNumber } from '../value-objects/phoneNumber.value';
import { Email } from '../value-objects/email.value';

import { Name } from '../../../common/domain/value-objects/name.value';

export class TravelerFactory {
  public static createFrom(name: Name, dni: Dni, phoneNumber:PhoneNumber,email:Email): Traveler {
    return new Traveler(TravelerId.create(0), name, dni,phoneNumber,email);
  }

  public static withId(travelerId: TravelerId, name: Name, dni: Dni, phoneNumber:PhoneNumber,email:Email): Traveler  {
    return new Traveler(travelerId, name, dni,phoneNumber,email);
  }
}