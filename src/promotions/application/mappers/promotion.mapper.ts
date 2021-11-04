import { Promotion } from '../../domain/entities/promotion.entity';
import { PromotionTypeORM } from '../../infrastructure/persistence/typeorm/entities/promotion.typeorm';
import { promotionTitleTypeORM } from '../../infrastructure/persistence/typeorm/entities/promotionTitle.typeorm';
import { PromotionIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/promotion.id.typeorm';
import { PromotionDateTypeorm } from '../../infrastructure/persistence/typeorm/entities/promotionDate.typeorm';
import { promotionContentTypeORM } from '../../infrastructure/persistence/typeorm/entities/promotionContent.typeorm';
import { promotionPartnerIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/promotionPartnerId.typeorm';

export class PromotionMapper{

  public static toTypeORM(promotion:Promotion):PromotionTypeORM{
      const promotionTypeORM:PromotionTypeORM=new PromotionTypeORM();
      promotionTypeORM.id=PromotionIdTypeORM.from(promotion.getId().getValue());
      promotionTypeORM.title=promotionTitleTypeORM.from(promotion.getTitle().getValue());
      promotionTypeORM.content=promotionContentTypeORM.from(promotion.getContent().getValue());
      promotionTypeORM.promotionDate=PromotionDateTypeorm.from(promotion.getPromotionDate().getPromotionStartDate(),promotion.getPromotionDate().getPromotionEndDate());
      promotionTypeORM.partnerId=promotionPartnerIdTypeORM.from(promotion.getPartnerId().getValue());

      return promotionTypeORM;
  }
}