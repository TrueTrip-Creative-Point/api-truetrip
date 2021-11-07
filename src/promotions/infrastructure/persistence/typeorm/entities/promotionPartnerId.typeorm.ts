import { Column, Unique } from 'typeorm';

export class promotionPartnerIdTypeORM {
  @Column('integer', { name: 'partnerId', nullable: false })
  value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): promotionPartnerIdTypeORM {
    return new promotionPartnerIdTypeORM(value);
  }
}