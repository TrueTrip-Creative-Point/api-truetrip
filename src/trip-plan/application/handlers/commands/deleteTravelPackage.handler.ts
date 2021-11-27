import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerTypeORM } from '../../../../partners/infrastructure/persistence/typeorm/entities/partner.typeorm';
import { Repository } from 'typeorm';
import { DeleteTravelPackageCommand } from '../../commands/delete-travel-package-command';
import { TravelPackageTypeORM } from '../../../infrastructure/persistence/typeorm/entities/travelPackage';

@CommandHandler(DeleteTravelPackageCommand)
export class DeleteTravelPackageHandler
  implements ICommandHandler<DeleteTravelPackageCommand> {
  constructor(
    @InjectRepository(TravelPackageTypeORM)
    private partnerRepository: Repository<TravelPackageTypeORM>,

  ) {
  }
  async execute(command:DeleteTravelPackageCommand){
    await this.partnerRepository.delete(command.id);
  }
}
