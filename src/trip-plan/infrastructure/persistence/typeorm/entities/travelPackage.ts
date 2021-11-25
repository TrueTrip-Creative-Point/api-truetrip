import { Column, Entity, Unique } from "typeorm";
import { TravelPackageIdTypeORM } from "./travelPackage.id.typeorm";
import { AmountPeopleTypeORM } from "../../../../../common/infrastructure/persistence/typeorm/entities/amount-people.typeorm";
import { UrlImageTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/entities/url-image.typeorm";
import { DescriptionTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/description.typeorm';
import { PromotionTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/promotion.typeorm';

@Entity('travel_plan')
export class TravelPackageTypeORM{
  //aca se usa los atributosOrm de commom
 @Column((type)=>TravelPackageIdTypeORM,{prefix:false})
  public id:TravelPackageIdTypeORM;

  @Column((type)=>DescriptionTypeORM,{prefix:false})
  public description:DescriptionTypeORM;

  @Column((type)=>AmountPeopleTypeORM,{prefix:false})
  public amount_people:AmountPeopleTypeORM;

  @Column((type)=>PromotionTypeORM,{prefix:false})
  public promotion:PromotionTypeORM;

  @Column((type)=>UrlImageTypeorm,{prefix:false})
  public url_image:UrlImageTypeorm;


}
