import { Column, Unique } from 'typeorm';

export class CompanyNameTypeORM {
  @Column('varchar', { name: 'company_name', length: 70, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): CompanyNameTypeORM {
    return new CompanyNameTypeORM(value);
  }
}