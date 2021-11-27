import { Column } from "typeorm";

export class DescriptionTypeORM {
  @Column('varchar',{name:'description',length:100,nullable:false})
  public description:string;

  private constructor(description:string){
    this.description=description;
  }
  public static from(description:string):DescriptionTypeORM{
    return new DescriptionTypeORM(description);
  }
}
