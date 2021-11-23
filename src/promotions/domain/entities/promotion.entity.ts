import { AggregateRoot } from '@nestjs/cqrs';
import { PromotionId } from '../value-objects/promotionId.value';
import { PromotionDate } from '../value-objects/promotionDate.value';
import { PromotionRegisteredEvent } from '../events/promotion-registered.event';
import { promotionTitle } from '../value-objects/promotionTitle.value';
import { promotionContent } from '../value-objects/promotionContent.value';
import { promotionPartnerId } from '../value-objects/promotionPartnerId.value';

export class Promotion extends AggregateRoot{
  private id:PromotionId;
  private title:promotionTitle;
  private content:promotionContent;
  private promotionDate:PromotionDate;
  private partnerId:promotionPartnerId;

  public constructor (id: PromotionId, title: promotionTitle,
                      content: promotionContent, promotionDate: PromotionDate,partnerId:promotionPartnerId) {
    super();
    this.id = id;
    this.title = title;
    this.content = content;
    this.promotionDate = promotionDate;
    this.partnerId=partnerId;
  }
  public register() {
    const event = new PromotionRegisteredEvent(this.id.getValue(),this.title.getValue(),this.content.getValue(),this.promotionDate.getPromotionStartDate(),this.promotionDate.getPromotionEndDate(),this.partnerId.getValue());
    this.apply(event);
  }
  public update(id: PromotionId, title: promotionTitle,
                content: promotionContent, promotionDate: PromotionDate,partnerId:promotionPartnerId) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.promotionDate = promotionDate;
    this.partnerId=partnerId;
  }
  public getId(): PromotionId {
    return this.id;
  }

  public getTitle(): promotionTitle {
    return this.title;
  }

  public getContent(): promotionContent {
    return this.content;
  }

  public getPromotionDate(): PromotionDate {
    return this.promotionDate;
  }
  public getPartnerId():promotionPartnerId{
    return this.partnerId;
  }
  public changeId(id: PromotionId) {
    this.id = id;
  }

}