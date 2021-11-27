import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PartnerIdTypeORM } from './partner.id.typeorm';
import { NameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';
import { EmailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { CompanyNameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/company-name.typeorm';
import { PhoneNumberTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/phone-number.typeorm';

@Entity('partners')
@Unique('UQ_partners_dni', ['dni.value'])
export class PartnerTypeORM {
  @Column((type) => PartnerIdTypeORM, { prefix: false })
  public id: PartnerIdTypeORM;

  @Column((type) => NameTypeORM, { prefix: false })
  public name: NameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;


 @Column((type) => CompanyNameTypeORM, { prefix: false })
  public companyName: CompanyNameTypeORM;

 @Column((type) => PhoneNumberTypeORM, { prefix: false })
  public phoneNumber: PhoneNumberTypeORM;

 @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;
}