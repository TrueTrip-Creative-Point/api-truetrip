export class EditPartnerRequestDto {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dni: string,
    public readonly companyName: string,
    public readonly phoneNumber: string,
    public readonly email: string,
  ) {}
}
