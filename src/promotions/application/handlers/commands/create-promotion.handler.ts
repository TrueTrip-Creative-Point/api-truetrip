import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePromotionCommand } from '../../commands/create-promotion.command';
import { PromotionDateTypeorm } from '../../../infrastructure/persistence/typeorm/entities/promotionDate.typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionTypeORM } from '../../../infrastructure/persistence/typeorm/entities/promotion.typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { promotionTitle } from '../../../domain/value-objects/promotionTitle.value';
import { promotionContent } from '../../../domain/value-objects/promotionContent.value';
import { PromotionDate } from '../../../domain/value-objects/promotionDate.value';
import { promotionPartnerId } from '../../../domain/value-objects/promotionPartnerId.value';
import { Promotion } from '../../../domain/entities/promotion.entity';
import { PromotionFactory } from '../../../domain/factories/promotion.factory';
import { PromotionMapper } from '../../mappers/promotion.mapper';
import { PromotionId } from '../../../domain/value-objects/promotionId.value';

@CommandHandler(CreatePromotionCommand)
export class CreatePromotionHandler
  implements ICommandHandler<CreatePromotionCommand> {
  constructor(
    @InjectRepository(PromotionTypeORM)
    private promotionRepository: Repository<PromotionTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: CreatePromotionCommand) {
    const titleResult: Result<AppNotification, promotionTitle> = promotionTitle.create(command.title);
    if (titleResult.isFailure()) {
      return 0;
    }
    const contentResult: Result<AppNotification, promotionContent> = promotionContent.create(command.content);
    if (contentResult.isFailure()) {
      return 0;
    }
    const DateResult: Result<AppNotification, PromotionDate> = PromotionDate.create(command.promotionStartDate,command.promotionEndDate);
    if (DateResult.isFailure()) {
      return 0;
    }
    const partnerIdResult: Result<AppNotification, promotionPartnerId> = promotionPartnerId.create(command.partnerId);
    if (partnerIdResult.isFailure()) {
      return 0;
    }
    let promotion:Promotion=PromotionFactory.createFrom(DateResult.value,titleResult.value,contentResult.value,partnerIdResult.value);
    let promotionTypeORM=PromotionMapper.toTypeORM(promotion);
    promotionTypeORM=await this.promotionRepository.save(promotionTypeORM);
    if(promotionTypeORM==null){
        return 0;
    }
    const promotionId:number=Number(promotionTypeORM.id.value);
    promotion.changeId(PromotionId.create(promotionId));
    promotion=this.publisher.mergeObjectContext(promotion);
    promotion.register();
    promotion.commit();
    return promotionId;

  }
}