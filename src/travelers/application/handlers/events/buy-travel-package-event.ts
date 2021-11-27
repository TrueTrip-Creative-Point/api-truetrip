import { TravelPackageId } from '../../../../trip-plan/domain/value-objects/travel-packageId';
import { Amount_people } from '../../../../trip-plan/domain/value-objects/amount_people.value';
import { Description } from '../../../../trip-plan/domain/value-objects/description.value';
import { Promotion } from '../../../../trip-plan/domain/value-objects/promotion.value';
import { UrlImage } from '../../../../trip-plan/domain/value-objects/url_image.value';
import { TravelerId } from '../../../domain/value-objects/traveler-id.value';

export class BuyTravelPackageEvent {

  public readonly amount_people: number;
  public readonly description: string;
  public readonly promotion: string;
  public readonly url_image: string;
  public readonly traveler_id: number
}
