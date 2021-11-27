import { AggregateRoot } from "@nestjs/cqrs";
import { TravelPackageIdTypeORM } from "../../infrastructure/persistence/typeorm/entities/travelPackage.id.typeorm";
import { TravelPackageId } from "../value-objects/travel-packageId";
import { Amount_people } from "../value-objects/amount_people.value";
import { Description } from "../value-objects/description.value";
import { Promotion } from "../value-objects/promotion.value";
import { UrlImage } from "../value-objects/url_image.value";
import { TravelPackageEvent } from "../events/travel-package.event";
import { PartnerId } from "../../../partners/domain/value-objects/partner-id.value";
import { TravelerId } from '../../../travelers/domain/value-objects/traveler-id.value';
import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';


export class TravelPackageEntity extends AggregateRoot{
  private id: TravelPackageId;
  private readonly amount:Amount_people;
  private readonly description:Description;
  private readonly promotion:Promotion;
  private readonly url:UrlImage;
  private readonly traveler_id: TravelerId
  public constructor(id: TravelPackageId,amount:Amount_people,description:Description,promotion:Promotion,url:UrlImage, traveler_id: TravelerId){
    super();
    this.id=id;
    this.amount=amount;
    this.description=description;
    this.promotion=promotion;
    this.url=url;
    this.traveler_id= traveler_id;
  }
  public register(){
    const event= new TravelPackageEvent(this.id.getValue(),this.amount.getValue(),this.description.getValue(),this.promotion.getValue(),this.url.getValue(),this.traveler_id.getValue());
   this.apply(event);
  }
  public getId(){return this.id;}
  public getAmount(){return this.amount;}
  public getDescription(){return this.description;}
  public getPromotion(){return this.promotion;}
  public getUrl(){return this.url;}
  public getTravelerId(){return this.traveler_id;}
  public changeId(id: TravelPackageId) {
    this.id = id;
  }
  public buy(amount: Amount_people): Result<AppNotification, TravelPackageEntity> {
    const notification: AppNotification = new AppNotification;
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(this);
  }

}
