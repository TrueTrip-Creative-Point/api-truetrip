import { Column, Entity } from "typeorm";
import { TravelPackageIdTypeORM } from "./travelPackage.id.typeorm";
import { DescriptionTypeORM } from "../../../../../common/infrastructure/persistence/typeorm/entities/description.typeorm";
import { AmountPeopleTypeORM } from "../../../../../common/infrastructure/persistence/typeorm/entities/amount-people.typeorm";
import { PromotionTypeORM } from "../../../../../common/infrastructure/persistence/typeorm/entities/promotion.typeorm";
import { UrlImageTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/entities/url-image.typeorm";
import { TravelerIdTypeORMFor } from '../../../../../common/infrastructure/persistence/typeorm/entities/traveler_id';

@Entity('travel_plan')
export class TravelPackageTypeORM{
  //aca se usa los atributosOrm de commom
  @Column((type)=>TravelPackageIdTypeORM,{prefix:false})
  public id:TravelPackageIdTypeORM;

  @Column((type)=>AmountPeopleTypeORM,{prefix:false})
  public amount_people:AmountPeopleTypeORM;

  @Column((type)=>DescriptionTypeORM,{prefix:false})
  public description:DescriptionTypeORM;

  @Column((type)=>PromotionTypeORM,{prefix:false})
  public promotion:PromotionTypeORM;

  @Column((type)=>UrlImageTypeorm,{prefix:false})
  public url_image:UrlImageTypeorm;

  @Column((type)=>TravelerIdTypeORMFor,{prefix:false})
  public traveler_id: TravelerIdTypeORMFor;

}
