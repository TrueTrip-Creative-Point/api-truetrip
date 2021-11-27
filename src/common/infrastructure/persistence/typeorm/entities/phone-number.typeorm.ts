import { Column } from 'typeorm';

export class PhoneNumberTypeORM {
  @Column('varchar', { name: 'phone_number', length: 9, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): PhoneNumberTypeORM {
    return new PhoneNumberTypeORM(value);
  }
}