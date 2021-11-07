import { Column, Unique } from 'typeorm';

export class CompanyNameTypeORM {
  @Column('varchar', { name: 'companyName', length: 8, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): CompanyNameTypeORM {
    return new CompanyNameTypeORM(value);
  }
}