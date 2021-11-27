import { Partner } from '../../domain/entities/partner.entity';
import { PartnerTypeORM } from '../../infrastructure/persistence/typeorm/entities/partner.typeorm';
import { PartnerIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/partner.id.typeorm';
import { NameTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';
import {EmailTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { CompanyNameTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/company-name.typeorm';
import { PhoneNumberTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/phone-number.typeorm';

export class PartnerMapper {
  public static toTypeORM(partner: Partner): PartnerTypeORM {
    const partnerTypeORM: PartnerTypeORM = new PartnerTypeORM();
    partnerTypeORM.id = PartnerIdTypeORM.from(partner.getId().getValue());
    partnerTypeORM.name = NameTypeORM.from(partner.getName().getFirstName(), partner.getName().getLastName());
    partnerTypeORM.dni = DniTypeORM.from(partner.getDni().getValue());
    partnerTypeORM.companyName = CompanyNameTypeORM.from(partner.getCompanyName().getValue());
    partnerTypeORM.phoneNumber = PhoneNumberTypeORM.from(partner.getPhoneNumber().getValue());
    partnerTypeORM.email = EmailTypeORM.from(partner.getEmail().getValue());
    return partnerTypeORM;
  }
}