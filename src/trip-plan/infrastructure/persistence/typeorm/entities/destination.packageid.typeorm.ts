import { type } from "os";
import { TravelPackageEntity } from "src/trip-plan/domain/entities/TravelPackage.entity";
import { JoinColumn, ManyToOne } from "typeorm";
import { TravelPackageTypeORM } from "./travelPackage";

export class DestinationPackageIdTypeORM {
    @ManyToOne(type => TravelPackageTypeORM)
    @JoinColumn({name: 'travel_package_id'})
    value: TravelPackageTypeORM;

    private constructor(value: TravelPackageTypeORM) {
        this.value = value;
      }
    
      public static from(value: TravelPackageTypeORM): DestinationPackageIdTypeORM {
        return new DestinationPackageIdTypeORM(value);
      }
}