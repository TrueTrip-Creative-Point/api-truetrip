import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from 'src/partners/domain/entities/partner.entity';
import { RegisterPartnerCommand } from 'src/partners/application/commands/register-partner.command';
import { Repository } from 'typeorm';
import { PartnerFactory } from '../../../domain/factories/partner.factory';
import { PartnerId } from '../../../domain/value-objects/partner-id.value';
import { Dni } from '../../../domain/value-objects/dni.value';
import { CompanyName } from '../../../domain/value-objects/companyName.value';
import { PhoneNumber } from '../../../domain/value-objects/phoneNumber.value';
import { Email } from '../../../domain/value-objects/email.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { PartnerTypeORM } from '../../../infrastructure/persistence/typeorm/entities/partner.typeorm';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { PartnerMapper } from '../../mappers/partner.mapper';

@CommandHandler(RegisterPartnerCommand)
export class RegisterPartnerHandler
  implements ICommandHandler<RegisterPartnerCommand> {
  constructor(
    @InjectRepository(PartnerTypeORM)
    private partnerRepository: Repository<PartnerTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterPartnerCommand) {
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


    let partner: Partner = PartnerFactory.createFrom(nameResult.value, dniResult.value,companyNameResult.value,phoneNumberResult.value,emailResult.value);
    let partnerTypeORM = PartnerMapper.toTypeORM(partner);
    partnerTypeORM = await this.partnerRepository.save(partnerTypeORM);
    if (partnerTypeORM == null) {
      return 0;
    }
    const partnerId:number = Number(partnerTypeORM.id.value);
    partner.changeId(PartnerId.create(partnerId));
    partner = this.publisher.mergeObjectContext(partner);
    partner.register();
    partner.commit();
    return partnerId;
  }
}
