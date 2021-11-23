import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class Name {
  private readonly value: string;
  private static MAX_LENGTH: number = 20;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Result<AppNotification, Name>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('Name of the destination is required', null);
    }
    if (value.length >= this.MAX_LENGTH) {
      notification.addError('destination field must have ' + Name.MAX_LENGTH + ' characters', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Name(value));
   }
}