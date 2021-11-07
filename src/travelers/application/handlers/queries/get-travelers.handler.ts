import { GetTravelersQuery } from '../../queries/get-travelers.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetTravelersDto } from '../../dtos/queries/get-travelers.dto';

@QueryHandler(GetTravelersQuery)
export class GetTravelersHandler implements IQueryHandler<GetTravelersQuery> {
  constructor() {}

  async execute(query: GetTravelersQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
      phone_number as phoneNumber,
      email
  
    FROM 
      travelers
    ORDER BY
      last_name, first_name;`;
    const ormTravelers = await manager.query(sql);
    if (ormTravelers.length <= 0) {
      return [];
    }
    const travelers: GetTravelersDto[] = ormTravelers.map(function (ormTraveler) {
      let travelerDto = new GetTravelersDto();
      travelerDto.id = Number(ormTraveler.id);
      travelerDto.firstName = ormTraveler.firstName;
      travelerDto.lastName = ormTraveler.lastName;
      travelerDto.dni = ormTraveler.dni;
      travelerDto.phoneNumber = ormTraveler.phoneNumber;
      travelerDto.email = ormTraveler.email;


      return travelerDto;
    });
    return travelers;
  }
}