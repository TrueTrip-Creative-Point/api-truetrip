import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class UrlImage{
  private url:string;
  public constructor(url:string){
    this.url=url;
  }

  public getValue(): string {
    return this.url;
  }
  public setValue(value: string):void{this.url=value;}
  public static create(value: string): Result<AppNotification, UrlImage>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('companyName is required', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new UrlImage(value));
  }
}
