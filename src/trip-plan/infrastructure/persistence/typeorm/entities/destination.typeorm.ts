import { Column, Entity } from "typeorm";
import { DestinationDescriptionTypeORM } from "./destination.description.typeorm";
import { DestinationIdTypeORM } from "./Destination.id.typeorm";
import { DestinationNameTypeORM } from "./Destination.name.typeorm";
import { DestinationPackageIdTypeORM } from "./destination.packageid.typeorm";

@Entity('destinations')
export class DestinationTypeORM {
  @Column((type)=>DestinationIdTypeORM,{prefix:false})
  public id:DestinationIdTypeORM;

  @Column((type)=>DestinationNameTypeORM,{prefix:false})
  public name:DestinationNameTypeORM;

  @Column((type)=>DestinationDescriptionTypeORM,{prefix:false})
  public description:DestinationDescriptionTypeORM;

  @Column((type)=>DestinationPackageIdTypeORM,{prefix:false})
  public packageId:DestinationPackageIdTypeORM;
}