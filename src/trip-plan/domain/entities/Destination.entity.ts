import { AggregateRoot } from "@nestjs/cqrs";
import { DestinationEvent } from "../events/destination.event";
import { DescriptionDestination } from "../value-objects/description-destination.value";
import { DestinationID } from "../value-objects/destination-id.value";
import { Name } from "../value-objects/name.value";
import { PackageId } from "../value-objects/Package-id.value";

export class DestinationEntity extends AggregateRoot {
  private id: DestinationID;
  private name: Name
  private description:DescriptionDestination;
  private packageId: PackageId;
  public constructor(id: DestinationID,name: Name,description: DescriptionDestination, packageId: PackageId){
    super();
    this.id=id;
    this.name=name;
    this.description=description;
    this.packageId=packageId;
  }
  public register(){
    const event= new DestinationEvent(this.id.getValue(),this.name.getValue(),this.description.getValue(),this.packageId.getValue());

  }
  public getId(){return this.id;}
  public getName(){return this.name;}
  public getDescription(){return this.description;}
  public getPackageId(){return this.packageId;}
}