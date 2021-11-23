import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePartnerCommand } from '../../commands/DeletePartnerCommand';
import { PartnerTypeORM } from '../../../infrastructure/persistence/typeorm/entities/partner.typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@CommandHandler(DeletePartnerCommand)
export class DeletePartnerHandler
  implements ICommandHandler<DeletePartnerCommand> {
  constructor(
    @InjectRepository(PartnerTypeORM)
    private partnerRepository: Repository<PartnerTypeORM>,

  ) {
  }
  async execute(command:DeletePartnerCommand){
    await this.partnerRepository.delete(command.id);
  }
}
