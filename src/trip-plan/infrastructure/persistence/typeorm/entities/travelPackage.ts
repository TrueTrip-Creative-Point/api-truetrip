import { Column, Entity, Unique } from "typeorm";
import { TravelPackageIdTypeORM } from "./travelPackage.id.typeorm";
import { DescriptionTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/entities/description.typeorm";
import { AmountPeopleTypeORM } from "../../../../../common/infrastructure/persistence/typeorm/entities/amount_people.typeorm";
import { PromotionTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/entities/promotion.typeorm";
import { UrlImageTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/entities/url_image.typeorm";
import { TravelerIdTypeORM } from '../../../../../travelers/infrastructure/persistence/typeorm/entities/traveler.id.typeorm';
import { TravelerIdTypeORMFor } from '../../../../../common/infrastructure/persistence/typeorm/entities/traveler_id';

@Entity('travel_plan')
export class TravelPackageTypeORM{
  //aca se usa los atributosOrm de commom
 @Column((type)=>TravelPackageIdTypeORM,{prefix:false})
  public id:TravelPackageIdTypeORM;

 @Column((type)=>AmountPeopleTypeORM,{prefix:false})
 public amount_people:AmountPeopleTypeORM;

  @Column((type)=>DescriptionTypeorm,{prefix:false})
  public description:DescriptionTypeorm;

  @Column((type)=>PromotionTypeorm,{prefix:false})
  public promotion:PromotionTypeorm;

  @Column((type)=>UrlImageTypeorm,{prefix:false})
  public url_image:UrlImageTypeorm;

  @Column((type)=>TravelerIdTypeORMFor,{prefix:false})
 public traveler_id: TravelerIdTypeORMFor;

}
