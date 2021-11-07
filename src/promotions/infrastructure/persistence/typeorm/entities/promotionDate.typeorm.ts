import { Column } from 'typeorm';

export class PromotionDateTypeorm{

  @Column('varchar',{name:'promotionStart_Date', length: 75, nullable: false })
  public promotionStartDate: string;

  @Column('varchar', { name: 'promotionEnd_Date', length: 75, nullable: false })
  public promotionEndDate: string;

  private constructor(promotionStartDate: string, promotionEndDate: string) {
    this.promotionStartDate = promotionStartDate;
    this.promotionEndDate = promotionEndDate;
  }

  public static from(promotionStartDate: string, promotionEndDate: string): PromotionDateTypeorm {
    return new PromotionDateTypeorm(promotionStartDate, promotionEndDate);
  }
}