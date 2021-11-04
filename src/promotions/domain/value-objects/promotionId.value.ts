export class PromotionId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new PromotionId(value);
  }

  public getValue(): number {
    return this.value;
  }
}