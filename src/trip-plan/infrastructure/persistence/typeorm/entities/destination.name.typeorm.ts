import { Column } from "typeorm";

export class DestinationNameTypeORM {
    @Column('varchar', { name: 'name', length: 20, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): DestinationNameTypeORM {
    return new DestinationNameTypeORM(value);
  }
}