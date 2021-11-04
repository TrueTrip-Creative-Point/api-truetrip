import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetPromotionsDto } from '../../dtos/queries/get-promotions.dto';
import { GetPromotionsQuery } from '../../queries/get-promotions.query';

@QueryHandler(GetPromotionsQuery)
export class GetPromotionsHandler implements IQueryHandler<GetPromotionsQuery> {
  constructor() {
  }

  async execute(query: GetPromotionsQuery){
    const manager=getManager();
    const sql=`
    SELECT 
      id,
      title as title,
      content as content,
      promotionStart_Date as PromotionStartDate,
      promotionEnd_Date as PromotionEndDate,
      partnerId
  
    FROM 
      promotions
    ORDER BY
      id
    `;
    const ormPromotions = await manager.query(sql);
    if (ormPromotions.length <= 0) {
      return [];
    }
    const promotions:GetPromotionsDto[]=ormPromotions.map(function (ormPromotions){
      let promotionDto=new GetPromotionsDto();
      promotionDto.id=Number(ormPromotions.id);
      promotionDto.title=ormPromotions.title;
      promotionDto.content=ormPromotions.content;
      promotionDto.promotionStartDate=ormPromotions.promotionStartDate;
      promotionDto.promotionEndDate=ormPromotions.promotionEndDate;
      promotionDto.partnerId=Number(ormPromotions.partnerId);

      return promotionDto;
    });
    return promotions;
  }
}