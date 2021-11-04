import { Column } from "typeorm";

export class AmountPeopleTypeORM{
  @Column('bigint',{name:'amount_people',nullable:true})
  public amount_people:number;
  private constructor(amount_people:number){
    this.amount_people=amount_people;
  }
  public static from(amount_people:number):AmountPeopleTypeORM{
    return new AmountPeopleTypeORM(amount_people);
  }
}
