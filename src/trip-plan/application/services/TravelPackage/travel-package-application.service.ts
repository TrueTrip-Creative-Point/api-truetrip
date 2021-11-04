import {Injectable} from '@nestjs/common'
import { CommandBus } from "@nestjs/cqrs";
import { RegisterTravelPackageValidator } from "../../validators/TravelPackage/travelPackage.validator";
import { AppNotification } from "../../../../common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterTravelPackageRequestDto } from "../../dtos/request/TravelPackage/register-travelPackage-request.dto";
import { RegisterTravelPackageCommand } from "../../commands/TravelPackage/register-travel-package.command";
import { RegisterTravelPackageResponseDto } from "../../dtos/response/TravelPackage/register-travel-package-response.dto";
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
      registerTravelPackageDto.url_image,
      registerTravelPackageDto.description,
      registerTravelPackageDto.promotion
    );
    const travelPackageId= await this.commandBus.execute(registerTravelPackageCommand);
    const registerTravelPackageResponseDto:RegisterTravelPackageResponseDto= new RegisterTravelPackageResponseDto(
      travelPackageId,
      registerTravelPackageDto.amount_people,
      registerTravelPackageDto.url_image,
      registerTravelPackageDto.description,
      registerTravelPackageDto.promotion
    );
    return Result.ok(registerTravelPackageResponseDto);
  }


}
