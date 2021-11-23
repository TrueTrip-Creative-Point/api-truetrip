import { Column } from "typeorm";

export class DestinationDescriptionTypeORM {
    @Column('varchar', { name: 'description', length: 200, nullable: false })
    value: string;
  
    private constructor(value: string) {
      this.value = value;
    }
  
    public static from(value: string): DestinationDescriptionTypeORM {
      return new DestinationDescriptionTypeORM(value);
    }
}