import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class TravelPackageId{
  private readonly value:number;
  private constructor(value:number){
    this.value=value;
  }

  public getValue(): number {
    return this.value;
  }

  public static create(value:number){
    return new TravelPackageId(value);
  }
}
