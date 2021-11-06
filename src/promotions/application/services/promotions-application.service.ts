import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePromotionValidator } from '../validators/create-promotion.validator';
import { CreatePromotionRequestDto } from '../dtos/request/create-promotion-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { CreatePromotionResponseDto } from '../dtos/response/created-promotion-response.dto';
import { CreatePromotionCommand } from '../commands/create-promotion.command';


@Injectable()
export class PromotionsApplicationService{
  constructor(
    private commandBus: CommandBus,
    private createPromotionValidator: CreatePromotionValidator,
  ) {}

  async create(
    createPromotionRequestDto:CreatePromotionRequestDto,
  ):Promise<Result<AppNotification, CreatePromotionResponseDto>>{
    const notification: AppNotification = await this.createPromotionValidator.validate(
      createPromotionRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createPromotionCommand:CreatePromotionCommand=new CreatePromotionCommand(
      createPromotionRequestDto.title,
      createPromotionRequestDto.content,
      createPromotionRequestDto.promotionStartDate,
      createPromotionRequestDto.promotionEndDate,
      createPromotionRequestDto.partnerId
    );
    const promotionId = await this.commandBus.execute(createPromotionCommand);
    const createPromotionResponseDto:CreatePromotionResponseDto=new CreatePromotionResponseDto(
      promotionId,
      createPromotionRequestDto.title,
      createPromotionRequestDto.content,
      createPromotionRequestDto.promotionStartDate,
      createPromotionRequestDto.promotionEndDate,
      createPromotionRequestDto.partnerId
    );
    return Result.ok(createPromotionResponseDto);
  }
}