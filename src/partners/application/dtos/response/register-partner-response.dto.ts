export class RegisterPartnerResponseDto {
  constructor(
    public id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dni: string,
    public readonly companyName: string,
    public readonly phoneNumber: string,
    public readonly email: string,
  ) {}
}
