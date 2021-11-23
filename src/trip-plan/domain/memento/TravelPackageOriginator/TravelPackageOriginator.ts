
import { TravelPackageEntity } from '../../entities/TravelPackage.entity';
import { Description } from "../../value-objects/description.value";
import { Amount_people } from "../../value-objects/amount_people.value";
import { UrlImage } from "../../value-objects/url_image.value";
import { Promotion } from "../../value-objects/promotion.value";
import { TravelPackageId } from "../../value-objects/travel-packageId";


export class TravelPackageOriginator{
  private  description: Description;
  private  amount: Amount_people;
  private  url:UrlImage;
  private id: TravelPackageId;
  private promotion: Promotion;

  public getAmount(){return this.amount;}
  public getDescription(){return this.description;}
  public getUrl(){return this.url;}
  public getId(){return this.id;}
  public getPromotion(){return this.promotion;}

  public setAmount(amount:Amount_people):void {this.amount=amount;}
  public setDescription(description: Description): void {this.description =description}
  public setUrl(url:UrlImage): void {this.url=url;}
  public setId(id: TravelPackageId): void {this.id=id;}
  public setPromotion(promotion: Promotion): void {this.promotion= promotion;}

  public toString(): string{
    return "Travel Package with: "+ this.id + ":" + this.description + ":" + this.url + ":" + this.amount;
  }
  public setMemento(travel_package: TravelPackageEntity): void{
    this.id= travel_package.getId();
  this.description = travel_package.getDescription();
  this.amount = travel_package.getAmount();
  this.url = travel_package.getUrl();
  this.promotion= travel_package.getPromotion();
 }
 public createMemento(): TravelPackageEntity{
    return new TravelPackageEntity(this.id,this.amount,this.description,this.promotion,this.url);
 }


}
