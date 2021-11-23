import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTravelersDto } from '../../dtos/queries/get-travelers.dto';
import { getManager } from 'typeorm';
import { GetTravelerByIdQuery } from '../../queries/get-traveler-by-id.query';

@QueryHandler(GetTravelerByIdQuery)
export class GetTravelerByIdHandler implements IQueryHandler<GetTravelerByIdQuery> {
    constructor(){}

    async execute(query: GetTravelerByIdQuery) {
        const manager = getManager();
        const sql = `
        SELECT
            t.id,
            t.first_name,
            t.last_name,
            t.dni,
            t.phone_number,
            t.email
        FROM
            travelers t
        WHERE
            t.id = ?;`;
        const ormTravelers = await manager.query(sql, [query.travelerId]);
        if(ormTravelers.length <= 0) {
            return{}
        }
        const ormTraveler = ormTravelers[0];
        let travelerDto = new GetTravelersDto();
        travelerDto.id = Number(ormTraveler.id);
        travelerDto.firstName = ormTraveler.firstName;
        travelerDto.lastName = ormTraveler.lastName;
        travelerDto.dni = ormTraveler.dni;
        travelerDto.phoneNumber = ormTraveler.phoneNumber;
        travelerDto.email = ormTraveler.email;
        return travelerDto;
    }
}