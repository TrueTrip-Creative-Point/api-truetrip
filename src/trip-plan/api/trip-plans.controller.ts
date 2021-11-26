import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { TravelPackageApplicationService } from "../application/services/travel-package-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { RegisterTravelPackageRequestDto } from "../application/dtos/request/register-travelPackage-request.dto";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterTravelPackageResponseDto } from "../application/dtos/response/register-travel-package-response.dto";
import { Result } from "typescript-result";
import { ApiController } from "../../common/api/api.controller";
import { GetTravelPackageQuery } from "../application/queries/get-travel-package.query";

import { EditTravelPackageRequestDto } from '../application/dtos/request/edit-travelPackage-request.dto';
import { UpdateTravelPackageResponseDto } from '../application/dtos/response/update-travel-package-response.dto';
@Controller('tripPlans')
export class TripPlansController{
  constructor(
    private readonly travelPackageService:TravelPackageApplicationService,
    private readonly queryBus: QueryBus
  ){}
  @Post()
  async registerTravelPackage(
    @Body() registerTravelPackageRequestDto: RegisterTravelPackageRequestDto,
    @Res({passthrough:true}) response
  ):Promise<object>{
    try{
      const result: Result<AppNotification,RegisterTravelPackageResponseDto>=await this.travelPackageService.register(registerTravelPackageRequestDto);
      if(result.isSuccess()){
        return ApiController.created(response,result.value);
      }
      return ApiController.error(response,result.error.getErrors());
    }
    catch(error){
      return ApiController.serverError(response,error);
    }
  }
  @Get()
  async getTravelPackages(@Res({passthrough:true}) response):Promise<object>{
    try{
      const travel_packages= await this.queryBus.execute(new GetTravelPackageQuery());
      return ApiController.ok(response,travel_packages);
    }
    catch(error){
      return ApiController.serverError(response,error);
    }
  }
  @Put("/:id")
  async update(
    @Body() updateTravelPackageDto: EditTravelPackageRequestDto,
    @Res({ passthrough: true }) response,
    @Param('id')id
  ):Promise<object>{
    try{
      const result: Result<AppNotification, UpdateTravelPackageResponseDto> = await this.travelPackageService.update(updateTravelPackageDto,id);
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
      const a=await this.travelPackageService.delete(id);
      return  ApiController.created(response, a);
    }catch (error) {
      return ApiController.serverError(response, error);
    }
  }

}
