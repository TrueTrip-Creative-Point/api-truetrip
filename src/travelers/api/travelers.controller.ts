import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterTravelerRequestDto } from '../application/dtos/request/register-traveler-request.dto';
import { RegisterTravelerResponseDto } from '../application/dtos/response/register-traveler-response.dto';
import { TravelersApplicationService } from '../application/services/travelers-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetTravelersQuery } from '../application/queries/get-travelers.query';

@Controller('travelers')
export class TravelersController {
  constructor(
    private readonly travelersApplicationService: TravelersApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerTravelerRequestDto: RegisterTravelerRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterTravelerResponseDto> = await this.travelersApplicationService.register(registerTravelerRequestDto);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getTravelers(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const travelers = await this.queryBus.execute(new GetTravelersQuery());
      return ApiController.ok(response, travelers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}