import { AggregateRoot } from "@nestjs/cqrs";
import { TravelPackageIdTypeORM } from "../../../infraestracture/persistence/typeorm/entities/TravelPackage/travelPackage.id.typeorm";
import { TravelPackageId } from "../value-objects/travel-packageId";
import { Amount_people } from "../value-objects/amount_people.value";
import { Description } from "../value-objects/description.value";
import { Promotion } from "../value-objects/promotion.value";
import { UrlImage } from "../value-objects/url_image.value";
import { TravelPackageEvent } from "../events/travel-package.event";


export class TravelPackageEntity extends AggregateRoot{
  private readonly id: TravelPackageId;
  private readonly amount:Amount_people;
  private readonly description:Description;
  private readonly promotion:Promotion;
  private readonly url:UrlImage;
  public constructor(id: TravelPackageId,amount:Amount_people,description:Description,promotion:Promotion,url:UrlImage){
    super();
    this.id=id;
    this.amount=amount;
    this.description=description;
    this.promotion=promotion;
    this.url=url;
  }
  public register(){
    const event= new TravelPackageEvent(this.id.getValue(),this.amount.getValue(),this.description.getValue(),this.promotion.getValue(),this.url.getValue());

  }
  public getId(){return this.id;}
  public getAmount(){return this.amount;}
  public getDescription(){return this.description;}
  public getPromotion(){return this.promotion;}
  public getUrl(){return this.url;}

}
