import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class CompanyName {
  private readonly value: string;
  private static MAX_LENGTH: number = 8;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Result<AppNotification, CompanyName>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('companyName is required', null);
    }


    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new CompanyName(value));
  }
}