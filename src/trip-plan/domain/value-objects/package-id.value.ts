export class PackageId {
    private readonly value:number;
    private constructor(value:number){
        this.value=value;
    }

  public getValue(): number {
    return this.value;
  }

  public static create(value:number){
    return new PackageId(value);
  }
}