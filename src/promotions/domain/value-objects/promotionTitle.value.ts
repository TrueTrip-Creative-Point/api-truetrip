import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class promotionTitle {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }
  public getValue(): string {
    return this.value;
  }

  public static create(ruc: string): Result<AppNotification, promotionTitle>
  {
    let notification: AppNotification = new AppNotification();
    ruc = (ruc ?? "").trim();
    if (ruc === "") {
      notification.addError('title is required', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new promotionTitle(ruc));
  }
}