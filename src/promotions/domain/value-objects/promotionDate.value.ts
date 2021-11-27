import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class PromotionDate{
  private readonly _promotionStartDate:string;
  private readonly _promotionEndDate:string;

  constructor(promotionStartDate: string, promotionEndDate: string) {
    this._promotionStartDate = promotionStartDate;
    this._promotionEndDate = promotionEndDate;
  }

  public  getPromotionStartDate(): string {
    return this._promotionStartDate;
  }

  public getPromotionEndDate(): string {
    return this._promotionEndDate;
  }
  public static create(promotionStartDate: string, promotionEndDate: string): Result<AppNotification, PromotionDate> {
    let notification: AppNotification = new AppNotification();
    promotionStartDate = (promotionStartDate ?? "").trim();
    promotionEndDate = (promotionEndDate ?? "").trim();
    if (promotionStartDate === "") {
      notification.addError('promotion start Date is required', null);
    }
    if (promotionEndDate === "") {
      notification.addError('promotion end Date is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new PromotionDate(promotionStartDate, promotionEndDate));
  }
  public static update(promotionStartDate: string, promotionEndDate: string): Result<AppNotification, PromotionDate> {
    let notification: AppNotification = new AppNotification();
    promotionStartDate = (promotionStartDate ?? "").trim();
    promotionEndDate = (promotionEndDate ?? "").trim();
    if (promotionStartDate === "") {
      notification.addError('promotion start Date is required', null);
    }
    if (promotionEndDate === "") {
      notification.addError('promotion end Date is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new PromotionDate(promotionStartDate, promotionEndDate));
  }
}
