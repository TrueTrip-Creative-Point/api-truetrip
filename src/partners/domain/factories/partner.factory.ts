import { Partner } from '../entities/partner.entity';
import { PartnerId } from '../value-objects/partner-id.value';
import { Dni } from '../value-objects/dni.value';

import { CompanyName} from '../value-objects/companyName.value';
import { PhoneNumber } from '../value-objects/phoneNumber.value';
import { Email } from '../value-objects/email.value';

import { Name } from '../../../common/domain/value-objects/name.value';

export class PartnerFactory {
  public static createFrom(name: Name, dni: Dni, companyName: CompanyName, phoneNumber:PhoneNumber,email:Email): Partner {
    return new Partner(PartnerId.create(0), name, dni,companyName,phoneNumber,email);
  }

  public static withId(partnerId: PartnerId, name: Name, dni: Dni,companyName: CompanyName, phoneNumber:PhoneNumber,email:Email): Partner  {
    return new Partner(partnerId, name, dni,companyName,phoneNumber,email);
  }
}