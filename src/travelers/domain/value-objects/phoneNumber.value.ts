import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class PhoneNumber {
  private readonly value: string;
  private static MAX_LENGTH: number = 8;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Result<AppNotification, PhoneNumber>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('phoneNumber is required', null);
    }
    if (value.length != this.MAX_LENGTH) {
      notification.addError('phoneNumber field must have ' + PhoneNumber.MAX_LENGTH + ' characters', null);
    }
    const regExp = new RegExp('^[0-9]+$');
    if (regExp.test(value) === false) {
      notification.addError('phoneNumber format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new PhoneNumber(value));
  }
}