import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class TravelPackageId{
  private value:number;
  public constructor(value:number){
    this.value=value;
  }

  public getValue(): number {
    return this.value;
  }
  public setValue(value: number):void{this.value=value;}

  public static create(value:number){
    return new TravelPackageId(value);
  }
}
