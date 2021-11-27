import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';

export class promotionPartnerId{
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }



  public getValue(): number {
    return this.value;
  }
  public static create(value: number): Result<AppNotification, promotionPartnerId>
  {
    let notification: AppNotification = new AppNotification();

    if (value.toLocaleString()==="") {
      notification.addError('PartnerId is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new promotionPartnerId(value));
  }
  public static of(value: number): promotionPartnerId {
    return new promotionPartnerId(value);
  }

}