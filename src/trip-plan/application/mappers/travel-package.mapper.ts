import { TravelPackageEntity } from "../../domain/entities/TravelPackage.entity";
import { TravelPackageTypeORM } from "../../infrastructure/persistence/typeorm/entities/travelPackage";
import { TravelPackageIdTypeORM } from "../../infrastructure/persistence/typeorm/entities/travelPackage.id.typeorm";
import { AmountPeopleTypeORM } from "../../../common/infrastructure/persistence/typeorm/entities/amount-people.typeorm";
import { UrlImageTypeorm } from "../../../common/infrastructure/persistence/typeorm/entities/url-image.typeorm";
import { DescriptionTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/description.typeorm';
import { PromotionTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/promotion.typeorm';

export class TravelPackageMapper {
  public static toTypeORM(travel_package: TravelPackageEntity): TravelPackageTypeORM {
    const travelTypeORM: TravelPackageTypeORM = new TravelPackageTypeORM();
    travelTypeORM.id = TravelPackageIdTypeORM.from(travel_package.getId().getValue());
    travelTypeORM.description = DescriptionTypeORM.from(travel_package.getDescription().getValue());
    travelTypeORM.amount_people= AmountPeopleTypeORM.from(travel_package.getAmount().getValue());
    travelTypeORM.url_image = UrlImageTypeorm.from(travel_package.getUrl().getValue());
    travelTypeORM.promotion = PromotionTypeORM.from(travel_package.getPromotion().getValue()) ;
    return travelTypeORM;
  }
}
