
import { TravelPackageOriginator } from "../TravelPackageOriginator/TravelPackageOriginator";
import { TravelPackageEntity } from '../../entities/TravelPackage.entity';

export class TravelPackageHistory {
  private travel_packageHistory: TravelPackageEntity[] = [];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
  }

  public save(travel_packageOriginator: TravelPackageOriginator): void{
    this.travel_packageHistory.push(travel_packageOriginator.createMemento());
  }

  public revert(travel_packageOriginator: TravelPackageOriginator): void{
    if(this.travel_packageHistory.length>0){
      travel_packageOriginator.setMemento(this.travel_packageHistory.pop());
    }
  }

}
