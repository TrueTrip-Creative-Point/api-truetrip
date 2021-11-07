import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class promotionContent {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }
  public getValue(): string {
    return this.value;
  }
  public static create(content: string): Result<AppNotification, promotionContent>
  {
    let notification: AppNotification = new AppNotification();
    content = (content ?? "").trim();
    if (content === "") {
      notification.addError('content is required', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new promotionContent(content));
  }
}