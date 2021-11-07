import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { TravelerIdTypeORM } from './traveler.id.typeorm';
import { NameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';
import { PhoneNumberTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/PhoneNumber.typeorm';
import { EmailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';

@Entity('travelers')
@Unique('UQ_partners_dni', ['dni.value'])
export class TravelerTypeORM {
  @Column((type) => TravelerIdTypeORM, { prefix: false })
  public id: TravelerIdTypeORM;

  @Column((type) => NameTypeORM, { prefix: false })
  public name: NameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;

 @Column((type) => PhoneNumberTypeORM, { prefix: false })
  public phoneNumber: PhoneNumberTypeORM;

 @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;
}