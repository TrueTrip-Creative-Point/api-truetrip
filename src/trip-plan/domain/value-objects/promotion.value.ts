import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class Promotion{
  private  value:string;
  private static MAX_LENGTH: number = 300;
  public constructor(value:string){
    this.value=value;
  }

  public getValue(): string {
    return this.value;
  }
  public setValue(value: string):void{this.value=value;}
  public static create(value: string): Result<AppNotification, Promotion>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value.length>=this.MAX_LENGTH) {
      notification.addError('value must have '+Promotion.MAX_LENGTH+'characters', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Promotion(value));
  }
}
