import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterTravelPackageCommand } from '../../commands/register-travel-package.command';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelPackageTypeORM } from '../../../infrastructure/persistence/typeorm/entities/travelPackage';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { Description } from '../../../domain/value-objects/description.value';
import { Amount_people } from '../../../domain/value-objects/amount_people.value';
import { Promotion } from '../../../domain/value-objects/promotion.value';
import { UrlImage } from '../../../domain/value-objects/url_image.value';
import { TravelPackageEntity } from '../../../domain/entities/TravelPackage.entity';
import { TravelPackageFactory } from '../../../domain/factories/travel-package.factory';
import { TravelPackageMapper } from '../../mappers/travel-package.mapper';
import { TravelPackageId } from '../../../domain/value-objects/travel-packageId';
import { EditTravelPackageCommand } from '../../commands/edit-travel-package.command';
import { TravelerId } from '../../../../travelers/domain/value-objects/traveler-id.value';

@CommandHandler(EditTravelPackageCommand)
export class UpdateTravelPackageHandler
  implements ICommandHandler<EditTravelPackageCommand>{
  constructor(
    @InjectRepository(TravelPackageTypeORM)
    private travelPackageRepository: Repository<TravelPackageTypeORM>,
    private publisher: EventPublisher
  ){}

  async execute(command: EditTravelPackageCommand) {
    const descriptionResult:Result<AppNotification,Description>=Description.create(command.description);
    if(descriptionResult.isFailure()){return 0;}
    const amountPeopleResult:Result<AppNotification,Amount_people>=Amount_people.create(command.amount_people.toLocaleString());
    if(amountPeopleResult.isFailure()){return 0;}
    const promotionResult:Result<AppNotification,Promotion>=Promotion.create(command.promotion);
    if(promotionResult.isFailure()){return 0;}
    const url:Result<AppNotification,UrlImage>=UrlImage.create(command.url_image);
    if(url.isFailure()){return 0;}
    const idResult:Result<AppNotification,TravelPackageId> = TravelPackageId.update(command.id)
    if(idResult.isFailure()){return 0;}
    const travelerIdResult:Result<AppNotification,TravelerId>=TravelerId.create(command.traveler_id);
     if(travelerIdResult.isFailure()){return 0;}
//El mapper sirve para el save y update
    let travel: TravelPackageEntity = TravelPackageFactory.withId(idResult.value,amountPeopleResult.value,descriptionResult.value,promotionResult.value,url.value,travelerIdResult.value);
    let travelTypeORM = TravelPackageMapper.toTypeORM(travel);
    let updateResult = await this.travelPackageRepository.update(command.id,travelTypeORM);
    if (updateResult  == null) {
      return 0;
    }

    travel = this.publisher.mergeObjectContext(travel);

    travel.commit();
    return travel;
  }

}
