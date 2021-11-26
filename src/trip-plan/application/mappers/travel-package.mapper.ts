
import { TravelPackageEntity } from "../../domain/entities/TravelPackage.entity";
import { TravelPackageTypeORM } from "../../infrastructure/persistence/typeorm/entities/travelPackage";
import { TravelPackageIdTypeORM } from "../../infrastructure/persistence/typeorm/entities/travelPackage.id.typeorm";
import { DescriptionTypeorm } from "../../../common/infrastructure/persistence/typeorm/entities/description.typeorm";
import { AmountPeopleTypeORM } from "../../../common/infrastructure/persistence/typeorm/entities/amount_people.typeorm";
import { UrlImageTypeorm } from "../../../common/infrastructure/persistence/typeorm/entities/url_image.typeorm";
import { PromotionTypeorm } from "../../../common/infrastructure/persistence/typeorm/entities/promotion.typeorm";
import { TravelerIdTypeORMFor } from '../../../common/infrastructure/persistence/typeorm/entities/traveler_id';



export class TravelPackageMapper {
  public static toTypeORM(travel_package: TravelPackageEntity): TravelPackageTypeORM {
    const travelTypeORM: TravelPackageTypeORM = new TravelPackageTypeORM();
    travelTypeORM.id = TravelPackageIdTypeORM.from(travel_package.getId().getValue());
    travelTypeORM.amount_people= AmountPeopleTypeORM.from(travel_package.getAmount().getValue());
    travelTypeORM.description = DescriptionTypeorm.from(travel_package.getDescription().getValue());
    travelTypeORM.promotion = PromotionTypeorm.from(travel_package.getPromotion().getValue()) ;
    travelTypeORM.url_image = UrlImageTypeorm.from(travel_package.getUrl().getValue());
    travelTypeORM.traveler_id =TravelerIdTypeORMFor.from(travel_package.getTravelerId().getValue());

    return travelTypeORM;
  }
}
