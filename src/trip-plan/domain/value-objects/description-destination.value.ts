import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class DescriptionDestination {
private readonly value: string;
  private static MAX_LENGTH: number = 200;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Result<AppNotification, DescriptionDestination>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('Name of the description is required', null);
    }
    if (value.length >= this.MAX_LENGTH) {
      notification.addError('description field must have ' + DescriptionDestination.MAX_LENGTH + ' characters', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new DescriptionDestination(value));
   }
}