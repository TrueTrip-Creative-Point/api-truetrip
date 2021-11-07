import { Column, Unique } from 'typeorm';

export class promotionTitleTypeORM {
  @Column('varchar', { name: 'title', length: 100, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): promotionTitleTypeORM {
    return new promotionTitleTypeORM(value);
  }
}