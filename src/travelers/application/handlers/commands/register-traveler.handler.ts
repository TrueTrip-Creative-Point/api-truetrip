import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Traveler } from 'src/travelers/domain/entities/traveler.entity';
import { RegisterTravelerCommand } from 'src/travelers/application/commands/register-traveler.command';
import { Repository } from 'typeorm';
import { TravelerFactory } from '../../../domain/factories/traveler.factory';
import { TravelerId } from '../../../domain/value-objects/traveler-id.value';
import { Dni } from '../../../domain/value-objects/dni.value';
import { PhoneNumber } from '../../../domain/value-objects/phoneNumber.value';
import { Email } from '../../../domain/value-objects/email.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { TravelerTypeORM } from '../../../infrastructure/persistence/typeorm/entities/traveler.typeorm';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { TravelerMapper } from '../../mappers/traveler.mapper';

@CommandHandler(RegisterTravelerCommand)
export class RegisterTravelerHandler
  implements ICommandHandler<RegisterTravelerCommand> {
  constructor(
    @InjectRepository(TravelerTypeORM)
    private travelerRepository: Repository<TravelerTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterTravelerCommand) {
    const dniResult: Result<AppNotification, Dni> = Dni.create(command.dni);
    if (dniResult.isFailure()) {
      return 0;
    }
    const nameResult: Result<AppNotification, Name> = Name.create(command.firstName, command.lastName);
    if (nameResult.isFailure()) {
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


    let traveler: Traveler = TravelerFactory.createFrom(nameResult.value, dniResult.value,phoneNumberResult.value,emailResult.value);
    let travelerTypeORM = TravelerMapper.toTypeORM(traveler);
    travelerTypeORM = await this.travelerRepository.save(travelerTypeORM);
    if (travelerTypeORM == null) {
      return 0;
    }
    const travelerId:number = Number(travelerTypeORM.id.value);
    traveler.changeId(TravelerId.create2(travelerId));
    traveler = this.publisher.mergeObjectContext(traveler);
    traveler.register();
    traveler.commit();
    return travelerId;
  }
}
