import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionTypeORM } from '../../infrastructure/persistence/typeorm/entities/promotion.typeorm';
import { CreatePromotionRequestDto } from '../dtos/request/create-promotion-request.dto';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class CreatePromotionValidator {
  constructor(
    @InjectRepository(PromotionTypeORM)
    private promotionRepository: Repository<PromotionTypeORM>,
  ) {
  }

  public async validate(
    createPromotionRequestDto:CreatePromotionRequestDto
  ):Promise<AppNotification>{
    let notification: AppNotification = new AppNotification();


    let title: string = createPromotionRequestDto.title.trim();

    if (title.length <= 0) {
      notification.addError('Promotion Title  is required', null);
    }
    let content: string = createPromotionRequestDto.content.trim();

    if (content.length <= 0) {
      notification.addError('Promotion content  is required', null);
    }
    let promotionStartDate: string = createPromotionRequestDto.promotionStartDate.trim();

    if (promotionStartDate.length <= 0) {
      notification.addError('Promotion StartDate  is required', null);
    }
    let promotionEndDate: string = createPromotionRequestDto.promotionEndDate.trim();

    if (promotionEndDate.length <= 0) {
      notification.addError('Promotion EndDate  is required', null);
    }
    let partnerId: number = createPromotionRequestDto.partnerId;

    if (partnerId===null) {
      notification.addError('Promotion partnerId  is required', null);
    }
    if(notification.hasErrors()){
        return notification;
    }
    const promotion: PromotionTypeORM = await this.promotionRepository.createQueryBuilder().getOne();

    return notification;
  }
}