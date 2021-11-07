import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class UrlImage{
  private readonly url:string;
  private constructor(url:string){
    this.url=url;
  }

  public getValue(): string {
    return this.url;
  }
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
