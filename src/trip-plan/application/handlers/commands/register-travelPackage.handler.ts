import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterTravelPackageCommand } from "../../commands/register-travel-package.command";
import { InjectRepository } from "@nestjs/typeorm";
import { TravelPackageTypeORM } from "../../../infrastructure/persistence/typeorm/entities/travelPackage";
import { Repository } from "typeorm";
import { AppNotification } from "../../../../common/application/app.notification";
import { Description } from "../../../domain/value-objects/description.value";
import { Result } from "typescript-result";
import { Amount_people } from "../../../domain/value-objects/amount_people.value";
import { Promotion } from "../../../domain/value-objects/promotion.value";
import { UrlImage } from "../../../domain/value-objects/url_image.value";

@CommandHandler(RegisterTravelPackageCommand)
export class RegisterTravelPackageHandler
   implements ICommandHandler<RegisterTravelPackageCommand>{
  constructor(
    @InjectRepository(TravelPackageTypeORM)
    private travelPackageRepository: Repository<TravelPackageTypeORM>,
    private publisher: EventPublisher
  ){}

 async execute(command: RegisterTravelPackageCommand) {
    const descriptionResult:Result<AppNotification,Description>=Description.create(command.description);
     if(descriptionResult.isFailure()){return 0;}
     const amountPeopleResult:Result<AppNotification,Amount_people>=Amount_people.create(command.amount_people.toLocaleString());
     if(amountPeopleResult.isFailure()){return 0;}
     const promotionResult:Result<AppNotification,Promotion>=Promotion.create(command.promotion);
     if(promotionResult.isFailure()){return 0;}
   const url:Result<AppNotification,UrlImage>=UrlImage.create(command.url_image);
   if(url.isFailure()){return 0;}

  }


}