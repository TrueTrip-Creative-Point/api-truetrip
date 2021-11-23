
import { InjectRepository } from "@nestjs/typeorm";
import { PromotionTypeORM } from "../../../infrastructure/persistence/typeorm/entities/promotion.typeorm";
import { Repository } from "typeorm";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { PromotionId } from "../../../domain/value-objects/promotionId.value";
import { DeletePromotionCommand } from "../../commands/DeletePromotionCommand";


@CommandHandler(DeletePromotionCommand)
export class DeletePromotionHandler
  implements ICommandHandler<DeletePromotionCommand> {
  constructor(
    @InjectRepository(PromotionTypeORM)
    private promotionRepository: Repository<PromotionTypeORM>,

  ) {
  }
  async execute(command:DeletePromotionCommand){
    await this.promotionRepository.delete(command.id);
  }
}