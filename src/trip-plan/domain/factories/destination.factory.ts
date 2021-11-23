import { DestinationEntity } from "../entities/Destination.entity";
import { DescriptionDestination } from "../value-objects/description-destination.value";
import { DestinationID } from "../value-objects/destination-id.value";
import { Name } from "../value-objects/name.value";
import { PackageId } from "../value-objects/Package-id.value";

export class DestinationFactory{
    public static createFrom(name:Name,description:DescriptionDestination,packageId: PackageId):DestinationEntity {
      return new DestinationEntity(DestinationID.create(0),name,description,packageId);
    }
  }