import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class Description{
  private  value:string;
  public constructor(value:string){
    this.value=value;
  }

  public getValue(): string {
    return this.value;
  }
  public setValue(value: string):void{this.value=value;}
  public static create(value: string): Result<AppNotification, Description>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('companyName is required', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Description(value));
  }
}
