import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class Traveler_Id{
  private traveler_id_value:number;
  public constructor(amount_people:number){
    this.traveler_id_value=amount_people;
  }

  public getValue(): number {
    return this.traveler_id_value;
  }
  public setValue(value: number):void{this.traveler_id_value=value;}
  public static create(value: string): Result<AppNotification, Traveler_Id>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('companyName is required', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Traveler_Id(Number(value)));
  }
}
