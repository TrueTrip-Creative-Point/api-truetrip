import { Column, Unique } from 'typeorm';

export class promotionContentTypeORM {
  @Column('varchar', { name: 'content', length: 100, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): promotionContentTypeORM {
    return new promotionContentTypeORM(value);
  }
}