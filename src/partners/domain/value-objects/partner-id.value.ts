export class PartnerId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new PartnerId(value);
  }

  public getValue(): number {
    return this.value;
  }
}