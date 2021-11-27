import {Injectable} from '@nestjs/common'
import { CommandBus } from "@nestjs/cqrs";
import { RegisterTravelPackageValidator } from "../validators/travelPackage.validator"
import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterTravelPackageRequestDto } from "../dtos/request/register-travelPackage-request.dto";
import { RegisterTravelPackageCommand } from "../commands/register-travel-package.command";
import { RegisterTravelPackageResponseDto } from "../dtos/response/register-travel-package-response.dto";

import { EditTravelPackageRequestDto } from '../dtos/request/edit-travelPackage-request.dto';
import { UpdateTravelPackageResponseDto } from '../dtos/response/update-travel-package-response.dto';
import { EditTravelPackageCommand } from '../commands/edit-travel-package.command';
import { DeleteTravelPackageCommand } from '../commands/delete-travel-package-command';
@Injectable()
export class TravelPackageApplicationService{
  constructor(
    private commandBus:CommandBus,
    private registerTripPlanValidator:RegisterTravelPackageValidator,
  ){}
  async register(
    registerTravelPackageDto:RegisterTravelPackageRequestDto
  ):Promise<Result<AppNotification,RegisterTravelPackageResponseDto>>{
    const notification:AppNotification=await this.registerTripPlanValidator.validate(
      registerTravelPackageDto
    )
    if(notification.hasErrors()){
      return Result.error(notification);
    }


    const registerTravelPackageCommand:RegisterTravelPackageCommand=new RegisterTravelPackageCommand(
      registerTravelPackageDto.amount_people,
      registerTravelPackageDto.description,
      registerTravelPackageDto.promotion,
      registerTravelPackageDto.url_image,
      registerTravelPackageDto.traveler_id
    );
    const travelPackageId= await this.commandBus.execute(registerTravelPackageCommand);
    const registerTravelPackageResponseDto:RegisterTravelPackageResponseDto= new RegisterTravelPackageResponseDto(
      travelPackageId,
      registerTravelPackageDto.amount_people,
      registerTravelPackageDto.description,
      registerTravelPackageDto.promotion,
      registerTravelPackageDto.url_image,
      registerTravelPackageDto.traveler_id


    );
    return Result.ok(registerTravelPackageResponseDto);
  }
  async update(editTravelPackageRequest:EditTravelPackageRequestDto,id:number):Promise<Result<AppNotification, UpdateTravelPackageResponseDto>>{
    const notification: AppNotification = await this.registerTripPlanValidator.validate(
      editTravelPackageRequest,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    editTravelPackageRequest.id=id;
    const editTravelPackageCommand:EditTravelPackageCommand=new EditTravelPackageCommand(
      editTravelPackageRequest.id=id,
      editTravelPackageRequest.amount_people,
      editTravelPackageRequest.description,
      editTravelPackageRequest.promotion,
      editTravelPackageRequest.url_image,
      editTravelPackageRequest.traveler_id
    );
    const partnerId = await this.commandBus.execute(editTravelPackageCommand);
    const editTravelPackageResponseDto:UpdateTravelPackageResponseDto=new UpdateTravelPackageResponseDto(
      editTravelPackageRequest.id=id,
      editTravelPackageRequest.amount_people,
      editTravelPackageRequest.description,
      editTravelPackageRequest.promotion,
      editTravelPackageRequest.url_image,
      editTravelPackageRequest.traveler_id
    );

    return Result.ok(editTravelPackageResponseDto);
  }
  async delete(id:number){
    const deleteTravelPackageCommand:DeleteTravelPackageCommand=new DeleteTravelPackageCommand(
      id
    );
    await this.commandBus.execute(deleteTravelPackageCommand)
    return Result.ok("Object has been sucessfully deleted");
  }

}
