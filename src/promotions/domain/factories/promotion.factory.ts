import { PromotionDate } from '../value-objects/promotionDate.value';
import { Promotion } from '../entities/promotion.entity';
import { PromotionId } from '../value-objects/promotionId.value';
import { promotionTitle } from '../value-objects/promotionTitle.value';
import { promotionContent } from '../value-objects/promotionContent.value';
import { promotionPartnerId } from '../value-objects/promotionPartnerId.value';


export class PromotionFactory{
  public static createFrom(promotionDate:PromotionDate,title:promotionTitle,content:promotionContent,partnerId:promotionPartnerId):Promotion{
      return new Promotion(PromotionId.create(0),title,content,promotionDate,partnerId);
  }
  public static withId(promotionId:PromotionId,promotionDate:PromotionDate,title:promotionTitle,content:promotionContent,partnerId:promotionPartnerId):Promotion{
    return new Promotion(promotionId,title,content,promotionDate,partnerId);
  }
}