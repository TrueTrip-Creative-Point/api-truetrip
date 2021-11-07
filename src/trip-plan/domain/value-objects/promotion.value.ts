import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class Promotion{
  private readonly value:string;
  private static MAX_LENGTH: number = 300;
  private constructor(value:string){
    this.value=value;
  }

  public getValue(): string {
    return this.value;
  }
  public static create(value: string): Result<AppNotification, Promotion>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value.length>=this.MAX_LENGTH) {
      notification.addError('promotion must have '+Promotion.MAX_LENGTH+'characters', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Promotion(value));
  }
}
