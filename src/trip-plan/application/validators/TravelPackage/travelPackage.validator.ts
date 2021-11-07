import {Injectable} from '@nestjs/common'
import { InjectRepository } from "@nestjs/typeorm";
import { TravelPackageTypeORM } from "../../../infraestracture/persistence/typeorm/entities/TravelPackage/travelPackage";
import { Repository } from "typeorm";
import { RegisterTravelPackageRequestDto } from "../../dtos/request/TravelPackage/register-travelPackage-request.dto";
import { AppNotification } from "../../../../common/application/app.notification";
@Injectable()
export class RegisterTravelPackageValidator{
  constructor(
    //necesito un entity.class or schema
    @InjectRepository(TravelPackageTypeORM)
  private travelPackageRepository: Repository<TravelPackageTypeORM>
  ){}
public async validate(
  registerTravelPackageRequestDto:RegisterTravelPackageRequestDto
):Promise<AppNotification>{
    let notification:AppNotification= new AppNotification();
    //el DTO solo es una entidad que contiene todos los atributos de la clase TravelPackage
    const description:string=registerTravelPackageRequestDto.description.trim();
    if(description.length<=0){
      notification.addError('Travel Package description is required',null);
    }
  const amount_people:number=registerTravelPackageRequestDto.amount_people.valueOf();
    if(amount_people.toLocaleString().length<=0){
      notification.addError('Travel Package amount of people is required',null);
    }
  const url_image:string=registerTravelPackageRequestDto.url_image.trim();
  if(url_image.length<=0){
    notification.addError('Travel Package description is required',null);
  }
  const travel_package:TravelPackageTypeORM=await this.travelPackageRepository.createQueryBuilder().where("description=:description",{description}).getOne();
   if(travel_package!=null){
     notification.addError("Travel package description is taken",null);
   }
    return notification;
}

}
