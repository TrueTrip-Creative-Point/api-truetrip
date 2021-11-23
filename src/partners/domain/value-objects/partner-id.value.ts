import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class PartnerId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new PartnerId(value);
  }
  public static update(value:number): Result<AppNotification, PartnerId> {
    let notification: AppNotification = new AppNotification()
    return Result.ok(new PartnerId(value));
  }
  public getValue(): number {
    return this.value;
  }
}
