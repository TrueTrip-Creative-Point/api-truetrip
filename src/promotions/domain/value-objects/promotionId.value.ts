import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class PromotionId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new PromotionId(value);
  }
  public static create2(value:number): Result<AppNotification, PromotionId> {
    let notification: AppNotification = new AppNotification()
    return Result.ok(new PromotionId(value));
  }
  public getValue(): number {
    return this.value;
  }
}