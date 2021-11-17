import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class Email {
  private readonly value: string;
  private static MAX_LENGTH: number = 8;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Result<AppNotification, Email>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('email is required', null);
    }


    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Email(value));
  }
}