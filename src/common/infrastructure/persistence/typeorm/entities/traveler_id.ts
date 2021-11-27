import { Result } from 'typescript-result';
import { AppNotification } from '../../../../application/app.notification';
import { Column } from "typeorm";
export class TravelerIdTypeORMFor{
  @Column('bigint',{name:'traveler_id',nullable:true})
  public value:number;


  private constructor(promotion:number){
    this.value=promotion;
  }
  public static from(promotion:number):TravelerIdTypeORMFor{
    return new TravelerIdTypeORMFor(promotion);
  }
}
