import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class Amount_people{
  private amount_people:number;
  public constructor(amount_people:number){
    this.amount_people=amount_people;
  }

  public getValue(): number {
    return this.amount_people;
  }
  public setValue(value: number):void{this.amount_people=value;}
  public static create(value: string): Result<AppNotification, Amount_people>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('companyName is required', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Amount_people(Number(value)));
  }
}
