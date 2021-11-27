import { Amount_people } from "../value-objects/amount_people.value";
import { TravelPackageEntity } from "../entities/TravelPackage.entity";
import { Description } from "../value-objects/description.value";
import { Promotion } from "../value-objects/promotion.value";
import { UrlImage } from "../value-objects/url_image.value";
import { TravelPackageId } from "../value-objects/travel-packageId";
import { TravelerId } from '../../../travelers/domain/value-objects/traveler-id.value';

export class TravelPackageFactory{
  public static createFrom(amount_people:Amount_people,description:Description,promotion:Promotion,url:UrlImage,traveler_id: TravelerId):TravelPackageEntity{
    return new TravelPackageEntity(TravelPackageId.create(0),amount_people,description,promotion,url, traveler_id);
  }
  public static withId(travelPackageId: TravelPackageId,amount_people:Amount_people,description:Description,promotion:Promotion,url:UrlImage, traveler_id: TravelerId):TravelPackageEntity{
    return new TravelPackageEntity(travelPackageId,amount_people,description,promotion,url, traveler_id);
  }

}
