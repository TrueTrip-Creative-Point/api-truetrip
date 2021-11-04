import { Column, Entity, Unique } from 'typeorm';
import { PromotionIdTypeORM } from './promotion.id.typeorm';

import { PromotionDateTypeorm } from './promotionDate.typeorm';
import { promotionTitleTypeORM } from './promotionTitle.typeorm';
import { promotionPartnerIdTypeORM } from './promotionPartnerId.typeorm';
import { promotionContentTypeORM } from './promotionContent.typeorm';

@Entity('promotions')
export class PromotionTypeORM{
  @Column((type) => PromotionIdTypeORM, { prefix: false })
  public id: PromotionIdTypeORM;
  @Column((type) => promotionTitleTypeORM, { prefix: false })
  public title:promotionTitleTypeORM ;
  @Column((type) => promotionContentTypeORM, { prefix: false })
  public content:promotionContentTypeORM ;
  @Column((type) => PromotionDateTypeorm, { prefix: false })
  public promotionDate: PromotionDateTypeorm;
  @Column((type) => promotionPartnerIdTypeORM, { prefix: false })
  public partnerId: promotionPartnerIdTypeORM;

}