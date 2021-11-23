import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EditPartnerCommand } from '../../commands/EditPartnerCommand';
import { RegisterPartnerCommand } from '../../commands/register-partner.command';
import { PartnerTypeORM } from '../../../infrastructure/persistence/typeorm/entities/partner.typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { Partner } from '../../../domain/entities/partner.entity';
import { PartnerFactory } from '../../../domain/factories/partner.factory';
import { PartnerMapper } from '../../mappers/partner.mapper';
import { AppNotification } from '../../../../common/application/app.notification';
import { Dni } from '../../../domain/value-objects/dni.value';
import { CompanyName } from '../../../domain/value-objects/companyName.value';
import { PhoneNumber } from '../../../domain/value-objects/phoneNumber.value';
import { Email } from '../../../domain/value-objects/email.value';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { PartnerId } from '../../../domain/value-objects/partner-id.value';
@CommandHandler(EditPartnerCommand)

export class UpdatePartnerHandler
  implements ICommandHandler<RegisterPartnerCommand> {
  constructor(
    @InjectRepository(PartnerTypeORM)
    private partnerRepository: Repository<PartnerTypeORM>,
    private publisher: EventPublisher,
  ) {
  }
  async execute(command: EditPartnerCommand) {
    const dniResult: Result<AppNotification, Dni> = Dni.create(command.dni);
    if (dniResult.isFailure()) {
      return 0;
    }
    const nameResult: Result<AppNotification, Name> = Name.create(command.firstName, command.lastName);
    if (nameResult.isFailure()) {
      return 0;
    }


    const companyNameResult: Result<AppNotification, CompanyName> = CompanyName.create(command.companyName);
    if (companyNameResult.isFailure()) {
      return 0;
    }
    const phoneNumberResult: Result<AppNotification, PhoneNumber> = PhoneNumber.create(command.phoneNumber);
    if (phoneNumberResult.isFailure()) {
      return 0;
    }

    const emailResult: Result<AppNotification, Email> = Email.create(command.email);
    if (emailResult.isFailure()) {
      return 0;
    }

    const IdResult:Result<AppNotification, PartnerId> = PartnerId.update(command.id);
    if (IdResult.isFailure()) {
      return 0;
    }

    let partner: Partner = PartnerFactory.withId(IdResult.value,nameResult.value, dniResult.value,companyNameResult.value,phoneNumberResult.value,emailResult.value);
    let partnerTypeORM = PartnerMapper.toTypeORM(partner);
    let updateResult=await this.partnerRepository.update(command.id,partnerTypeORM);
    if(updateResult==null){
      return 0;
    }
    partner=this.publisher.mergeObjectContext(partner);
    partner.commit();
    return partner;

  }
}
