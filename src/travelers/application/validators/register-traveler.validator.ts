import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterTravelerRequestDto } from '../dtos/request/register-traveler-request.dto';
import { Repository } from 'typeorm';
import { TravelerTypeORM } from '../../infrastructure/persitence/typeorm/entities/traveler.typeorm';

@Injectable()
export class RegisterTravelerValidator {
  constructor(
    @InjectRepository(TravelerTypeORM)
    private travelerRepository: Repository<TravelerTypeORM>,
  ) {
  }

  public async validate(
    registerTravelerRequestDto: RegisterTravelerRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const firstName: string = registerTravelerRequestDto.firstName.trim();

    if (firstName.length <= 0) {
      notification.addError('Traveler firstName is required', null);
    }
    const lastName: string = registerTravelerRequestDto.lastName.trim();
    if (lastName.length <= 0) {
      notification.addError('Traveler lastName is required', null);
    }
    const dni: string = registerTravelerRequestDto.dni.trim();
    if (dni.length <= 0) {
      notification.addError('Traveler dni is required', null);
    }

 const phoneNumber: string = registerTravelerRequestDto.phoneNumber.trim();
    if (phoneNumber.length <= 0) {
      notification.addError('Traveler Phone Number is required', null);
    }
const email: string = registerTravelerRequestDto.email.trim();
    if (email.length <= 0) {
      notification.addError('Traveler email is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }
    const traveler: TravelerTypeORM = await this.travelerRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    if (traveler != null) {
      notification.addError('Traveler dni is taken', null);
    }
    return notification;
  }
}