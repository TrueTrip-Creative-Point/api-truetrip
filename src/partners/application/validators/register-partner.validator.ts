import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterPartnerRequestDto } from '../dtos/request/register-partner-request.dto';
import { Repository } from 'typeorm';
import { PartnerTypeORM } from '../../infrastructure/persistence/typeorm/entities/partner.typeorm';

@Injectable()
export class RegisterPartnerValidator {
  constructor(
    @InjectRepository(PartnerTypeORM)
    private partnerRepository: Repository<PartnerTypeORM>,
  ) {
  }

  public async validate(
    registerPartnerRequestDto: RegisterPartnerRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const firstName: string = registerPartnerRequestDto.firstName.trim();

    if (firstName.length <= 0) {
      notification.addError('Partner firstName is required', null);
    }
    const lastName: string = registerPartnerRequestDto.lastName.trim();
    if (lastName.length <= 0) {
      notification.addError('Partner lastName is required', null);
    }
    const dni: string = registerPartnerRequestDto.dni.trim();
    if (dni.length <= 0) {
      notification.addError('Partner dni is required', null);
    }

    const companyName: string = registerPartnerRequestDto.companyName.trim();

    if (companyName.length <= 0) {
      notification.addError('Partner Company Name is required', null);
    }

 const phoneNumber: string = registerPartnerRequestDto.phoneNumber.trim();
    if (phoneNumber.length <= 0) {
      notification.addError('Partner Phone Number is required', null);
    }
const email: string = registerPartnerRequestDto.email.trim();
    if (email.length <= 0) {
      notification.addError('Partner email is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }
    const partner: PartnerTypeORM = await this.partnerRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    if (partner != null) {
      notification.addError('Partner dni is taken', null);
    }
    return notification;
  }
}