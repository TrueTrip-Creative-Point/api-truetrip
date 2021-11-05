import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterPartnerRequestDto } from '../application/dtos/request/register-partner-request.dto';
import { RegisterPartnerResponseDto } from '../application/dtos/response/register-partner-response.dto';
import { PartnersApplicationService } from '../application/services/partners-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetPartnersQuery } from '../application/queries/get-partners.query';

@Controller('partners')
export class PartnersController {
  constructor(
    private readonly partnersApplicationService: PartnersApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerPartnerRequestDto: RegisterPartnerRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPartnerResponseDto> = await this.partnersApplicationService.register(registerPartnerRequestDto);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getPartners(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const partners = await this.queryBus.execute(new GetPartnersQuery());
      return ApiController.ok(response, partners);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}