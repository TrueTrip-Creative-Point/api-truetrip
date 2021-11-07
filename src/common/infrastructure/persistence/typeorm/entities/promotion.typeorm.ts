import { Column } from "typeorm";

export class PromotionTypeorm {
  @Column('varchar',{name:'promotion',length:100,nullable:true})
  public promotion:string;

  private constructor(promotion:string){
    this.promotion=promotion;
  }
  public static from(promotion:string):PromotionTypeorm{
    return new PromotionTypeorm(promotion);
  }
}
