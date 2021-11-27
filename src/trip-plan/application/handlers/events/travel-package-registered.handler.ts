import { CommandBus, IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TravelPackageEvent } from "../../../domain/events/travel-package.event";
import { BuyTravelPackageEvent } from '../../../../travelers/application/handlers/events/buy-travel-package-event';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelPackageTypeORM } from '../../../infrastructure/persistence/typeorm/entities/travelPackage';
import { getManager, Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { Description } from '../../../domain/value-objects/description.value';
import { Amount_people } from '../../../domain/value-objects/amount_people.value';
import { Promotion } from '../../../domain/value-objects/promotion.value';
import { UrlImage } from '../../../domain/value-objects/url_image.value';
import { TravelerId } from '../../../../travelers/domain/value-objects/traveler-id.value';
import { TravelPackageEntity } from '../../../domain/entities/TravelPackage.entity';
import { TravelPackageFactory } from '../../../domain/factories/travel-package.factory';
import { TravelPackageId } from '../../../domain/value-objects/travel-packageId';
import { TravelPackageMapper } from '../../mappers/travel-package.mapper';
import { CompleteTransaction } from '../../../../travelers/application/commands/CompletePayment';

@EventsHandler(BuyTravelPackageEvent)
export class TravelPackageRegisteredHandler implements IEventHandler<BuyTravelPackageEvent> {
  constructor(
    @InjectRepository(TravelPackageTypeORM)
    private travelPackageRepository: Repository<TravelPackageTypeORM>,
    private command: CommandBus
  ) {}

  async handle(event: BuyTravelPackageEvent) {
   let travelPackageTypeORM: TravelPackageTypeORM = await this.travelPackageRepository
     .createQueryBuilder()
     .where("id= :id")
     .setParameter("id",Number(event.traveler_id))
     .getOne();
   if(travelPackageTypeORM == null){
     console.log("Travel Package was not found")
   }

    const descriptionResult:Result<AppNotification,Description>=Description.create(event.description);
    if(descriptionResult.isFailure()){return 0;}
    const amountPeopleResult:Result<AppNotification,Amount_people>=Amount_people.create(event.amount_people.toLocaleString());
    if(amountPeopleResult.isFailure()){return 0;}
    const promotionResult:Result<AppNotification,Promotion>=Promotion.create(event.promotion);
    if(promotionResult.isFailure()){return 0;}
    const url:Result<AppNotification,UrlImage>=UrlImage.create(event.url_image);
    if(url.isFailure()){return 0;}

    const travelerIdResult:Result<AppNotification,TravelerId>=TravelerId.create(event.traveler_id);
    if(travelerIdResult.isFailure()){return 0;}

    const travelPackage: TravelPackageEntity = TravelPackageFactory.withId(TravelPackageId.of(travelPackageTypeORM.id.value),amountPeopleResult.value,descriptionResult.value,promotionResult.value,url.value,TravelerId.of(travelPackageTypeORM.traveler_id.value))
   const travelPackageResult: Result<AppNotification, TravelPackageEntity> = travelPackage.buy(amountPeopleResult.value);
if(travelPackageResult.isFailure){console.log("Your payment for your travel package is wrong")}

travelPackageTypeORM = TravelPackageMapper.toTypeORM(travelPackage);
  await getManager().transaction(async transactionalEntityManager => {
    travelPackageTypeORM = await this.travelPackageRepository.save(travelPackageTypeORM);
    if(travelPackageTypeORM == null){
      console.log("Travel Package money error");
      return ;
    }
    const completePayment: CompleteTransaction = new CompleteTransaction(event.traveler_id);
    await this.command.execute(completePayment);
   });
  }
}
