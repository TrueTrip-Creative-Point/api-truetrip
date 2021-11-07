import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterTravelerRequestDto } from '../dtos/request/register-traveler-request.dto';
import { RegisterTravelerCommand } from '../commands/register-traveler.command';
import { RegisterTravelerResponseDto } from '../dtos/response/register-traveler-response.dto';
import { RegisterTravelerValidator } from '../validators/register-traveler.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';

@Injectable()
export class TravelersApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerTravelerValidator: RegisterTravelerValidator,
  ) {}

  async register(
    registerTravelerRequestDto: RegisterTravelerRequestDto,
  ): Promise<Result<AppNotification, RegisterTravelerResponseDto>> {
    const notification: AppNotification = await this.registerTravelerValidator.validate(
      registerTravelerRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerTravelerCommand: RegisterTravelerCommand = new RegisterTravelerCommand(
      registerTravelerRequestDto.firstName,
      registerTravelerRequestDto.lastName,
      registerTravelerRequestDto.dni,
      registerTravelerRequestDto.phoneNumber,
      registerTravelerRequestDto.email,


    );
    const travelerId = await this.commandBus.execute(registerTravelerCommand);
    const registerTravelerResponseDto: RegisterTravelerResponseDto = new RegisterTravelerResponseDto(
      travelerId,
      registerTravelerRequestDto.firstName,
      registerTravelerRequestDto.lastName,
      registerTravelerRequestDto.dni,
      registerTravelerRequestDto.phoneNumber,
      registerTravelerRequestDto.email,
    );
    return Result.ok(registerTravelerResponseDto);
  }
}