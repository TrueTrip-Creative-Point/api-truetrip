export class CreatePromotionRequestDto {
  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly promotionStartDate: string,
    public readonly promotionEndDate: string,
    public readonly partnerId:number
  ) {}
}
