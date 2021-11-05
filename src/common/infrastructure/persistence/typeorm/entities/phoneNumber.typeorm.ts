import { Column, Unique } from 'typeorm';

export class PhoneNumberTypeORM {
  @Column('varchar', { name: 'phoneNumber', length: 8, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): PhoneNumberTypeORM {
    return new PhoneNumberTypeORM(value);
  }
}