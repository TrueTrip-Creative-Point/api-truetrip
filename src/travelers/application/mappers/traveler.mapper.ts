import { Traveler } from '../../domain/entities/traveler.entity';
import { TravelerTypeORM } from '../../infrastructure/persistence/typeorm/entities/traveler.typeorm';
import { TravelerIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/traveler.id.typeorm';
import { NameTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';
import { PhoneNumberTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/phoneNumber.typeorm';
import { EmailTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';

export class TravelerMapper {
  public static toTypeORM(traveler: Traveler): TravelerTypeORM {
    const travelerTypeORM: TravelerTypeORM = new TravelerTypeORM();
    travelerTypeORM.id = TravelerIdTypeORM.from(traveler.getId().getValue());
    travelerTypeORM.name = NameTypeORM.from(traveler.getName().getFirstName(), traveler.getName().getLastName());
    travelerTypeORM.dni = DniTypeORM.from(traveler.getDni().getValue());
    travelerTypeORM.phoneNumber = PhoneNumberTypeORM.from(traveler.getPhoneNumber().getValue());
    travelerTypeORM.email = EmailTypeORM.from(traveler.getEmail().getValue());
    return travelerTypeORM;
  }
}