import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class TravelerId {
    private value: number;
  
    private constructor(value: number) {
      this.value = value;
    }
  
    public static create(value: number): Result<AppNotification, TravelerId> {
      return Result.ok(new TravelerId(value));
    }
  public static create2(value:number){
    return new TravelerId(value);
  }
  public static of(value: number): TravelerId {
    return new TravelerId(value);
  }
    public getValue(): number {
      return this.value;
    }
  }
