import { PromotionsApplicationService } from '../application/services/promotions-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { CreatePromotionRequestDto } from '../application/dtos/request/create-promotion-request.dto';
import { ApiController } from '../../common/api/api.controller';
import { AppNotification } from '../../common/application/app.notification';
import { Result } from 'typescript-result';
import { CreatePromotionResponseDto } from '../application/dtos/response/created-promotion-response.dto';
import { GetPromotionsHandler } from '../application/handlers/queries/get-promotions.handler';
import { GetPromotionsQuery } from '../application/queries/get-promotions.query';
import { EditPromotionRequestDto } from "../application/dtos/request/edit-promotion-request.dto";
import { UpdatePromotionResponseDto } from "../application/dtos/response/UpdatePromotionResponseDto";

@Controller('promotions')
export class PromotionsController{
  constructor(
    private readonly promotionsApplicationService: PromotionsApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async create(
    @Body() createPromotionRequestDto: CreatePromotionRequestDto,
    @Res({ passthrough: true }) response
  ):Promise<object>{
      try{
        const result: Result<AppNotification, CreatePromotionResponseDto> = await this.promotionsApplicationService.create(createPromotionRequestDto);
        if (result.isSuccess()) {
          return ApiController.created(response, result.value);
        }
        return ApiController.error(response, result.error.getErrors());
      } catch (error) {
        return ApiController.serverError(response, error);
      }
  }
  @Get()
  async getPromotions(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const promotions = await this.queryBus.execute(new GetPromotionsQuery());
      return ApiController.ok(response, promotions);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
  @Put("/:id")
  async update(
    @Body() updatePromotionDto: EditPromotionRequestDto,
    @Res({ passthrough: true }) response,
    @Param('id')id
  ):Promise<object>{
    try{
      const result: Result<AppNotification, UpdatePromotionResponseDto> = await this.promotionsApplicationService.update(updatePromotionDto,id);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
  @Delete("/:id")
  async delete(
    @Res({ passthrough: true }) response,@Param('id')id){
    try{
      const a=await this.promotionsApplicationService.delete(id);
      return  ApiController.created(response, a);
    }catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}