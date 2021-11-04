import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTravelPackageQuery } from "../../../queries/TravelPackage/get-travel-package.query";
import { getManager } from "typeorm";
import { GetTravelPackageDto } from "../../../dtos/queries/get-travel-package.dto";

@QueryHandler(GetTravelPackageQuery)
export class GetTravelPackageHandler implements IQueryHandler<GetTravelPackageQuery>{
  constructor(){}
  async execute(query:GetTravelPackageQuery){
    const manager = getManager();
    const sql = `
    SELECT 
      id as id,
      description as description,
      promotion as promotion
    FROM 
      travel_plan
    ORDER BY
      id`;
    const ormPartners = await manager.query(sql);
    if (ormPartners.length <= 0) {
      return [];
    }
    const travel_plans: GetTravelPackageDto[] = ormPartners.map(function (ormPartner) {
      let travel_planDto = new GetTravelPackageDto();
      travel_planDto.id = Number(ormPartner.id);
      travel_planDto.amount = Number(ormPartner.amount);
      travel_planDto.description=ormPartner.description;
      travel_planDto.promotion=ormPartner.promotion;
      travel_planDto.url=ormPartner.url;

      return travel_planDto;
    });
    return travel_plans;
  }
}
