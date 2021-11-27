import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterPartnerRequestDto } from '../dtos/request/register-partner-request.dto';
import { RegisterPartnerCommand } from '../commands/register-partner.command';
import { RegisterPartnerResponseDto } from '../dtos/response/register-partner-response.dto';
import { RegisterPartnerValidator } from '../validators/register-partner.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { UpdatePartnerResponseDto } from '../dtos/response/updatePartnerResponse';
import { DeletePartnerCommand } from '../commands/DeletePartnerCommand';
import { EditPartnerCommand } from '../commands/EditPartnerCommand';
import { EditPartnerRequestDto } from '../dtos/request/edit-partner-request.dto';

@Injectable()
export class PartnersApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPartnerValidator: RegisterPartnerValidator,
  ) {}

  async register(
    registerPartnerRequestDto: RegisterPartnerRequestDto,
  ): Promise<Result<AppNotification, RegisterPartnerResponseDto>> {
    const notification: AppNotification = await this.registerPartnerValidator.validate(
      registerPartnerRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerPartnerCommand: RegisterPartnerCommand = new RegisterPartnerCommand(
      registerPartnerRequestDto.firstName,
      registerPartnerRequestDto.lastName,
      registerPartnerRequestDto.dni,
      registerPartnerRequestDto.companyName,
      registerPartnerRequestDto.phoneNumber,
      registerPartnerRequestDto.email,


    );
    const partnerId = await this.commandBus.execute(registerPartnerCommand);
    const registerPartnerResponseDto: RegisterPartnerResponseDto = new RegisterPartnerResponseDto(
      partnerId,
      registerPartnerRequestDto.firstName,
      registerPartnerRequestDto.lastName,
      registerPartnerRequestDto.dni,
      registerPartnerRequestDto.companyName,
      registerPartnerRequestDto.phoneNumber,
      registerPartnerRequestDto.email,
    );
    return Result.ok(registerPartnerResponseDto);
  }
  async update(editPartnerRequest:EditPartnerRequestDto,id:number):Promise<Result<AppNotification, UpdatePartnerResponseDto>>{
    const notification: AppNotification = await this.registerPartnerValidator.validate(
      editPartnerRequest,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    editPartnerRequest.id=id;
    const editPartnerCommand:EditPartnerCommand=new EditPartnerCommand(
      editPartnerRequest.id=id,
      editPartnerRequest.firstName,
      editPartnerRequest.lastName,
      editPartnerRequest.dni,
      editPartnerRequest.companyName,
      editPartnerRequest.phoneNumber,
    editPartnerRequest.email
    );
    const partnerId = await this.commandBus.execute(editPartnerCommand);
    const editPartnerResponseDto:UpdatePartnerResponseDto=new UpdatePartnerResponseDto(

      editPartnerRequest.id=id ,
      editPartnerRequest.firstName,
      editPartnerRequest.lastName,
      editPartnerRequest.dni,
      editPartnerRequest.companyName,
      editPartnerRequest.phoneNumber,
      editPartnerRequest.email
    );

    return Result.ok(editPartnerResponseDto);
  }
  async delete(id:number){
    const deletePartnerCommand:DeletePartnerCommand=new DeletePartnerCommand(
      id
    );
    await this.commandBus.execute(deletePartnerCommand)
    return Result.ok("Object has been sucessfully deleted");
  }
}
