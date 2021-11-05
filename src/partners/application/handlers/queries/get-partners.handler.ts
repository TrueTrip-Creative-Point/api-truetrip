import { GetPartnersQuery } from '../../queries/get-partners.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetPartnersDto } from '../../dtos/queries/get-partners.dto';

@QueryHandler(GetPartnersQuery)
export class GetPartnersHandler implements IQueryHandler<GetPartnersQuery> {
  constructor() {}

  async execute(query: GetPartnersQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
      company_name as companyName,
      phone_number as phoneNumber,
      email
  
    FROM 
      partners
    ORDER BY
      last_name, first_name;`;
    const ormPartners = await manager.query(sql);
    if (ormPartners.length <= 0) {
      return [];
    }
    const partners: GetPartnersDto[] = ormPartners.map(function (ormPartner) {
      let partnerDto = new GetPartnersDto();
      partnerDto.id = Number(ormPartner.id);
      partnerDto.firstName = ormPartner.firstName;
      partnerDto.lastName = ormPartner.lastName;
      partnerDto.dni = ormPartner.dni;
      partnerDto.companyName = ormPartner.companyName;
      partnerDto.phoneNumber = ormPartner.phoneNumber;
      partnerDto.email = ormPartner.email;


      return partnerDto;
    });
    return partners;
  }
}