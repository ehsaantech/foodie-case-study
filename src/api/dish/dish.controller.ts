import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import BaseResponse from 'src/core/models/BaseResponse';
import { ZodValidationPipe } from 'src/core/validation/zod.pipe';
import { DishDto, dishZodSchema } from './dto/dist.dto';
import { DishService } from './dish.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { UserRole } from '@prisma/client';
import { Request } from 'express';
import { CustomPayload } from 'src/core/models/Payload';


@ApiBearerAuth()
@ApiTags("Dishes")
@Controller('dish')
export class DishController {

    constructor(private readonly dishService: DishService) { }

    @ApiOperation({ summary: "Add Dish", description: "Add Dish to Database" })
    @ApiResponse({ status: 201 })
    @ApiBody({ required: true })
    @UseGuards(AuthGuard,new RoleGuard(UserRole.CHEF))
    @Post("/add")
    @UsePipes(new ZodValidationPipe(dishZodSchema))
    async addDish(@Body() dto: DishDto , @Req() req : Request) {
        const {id} : CustomPayload = req["user"];
        let result = await this.dishService.addDish(dto,id);
        return new BaseResponse(0, "success", result);
    }


    @ApiOperation({ summary: "Find All Dishes", description: "Find All Dishes from Database" })
    @ApiResponse({ status: 200 })
    @UseGuards(AuthGuard,new RoleGuard(UserRole.FOODIE))
    @Get("/findAll")
    async getAllDishes() {
        let result = await this.dishService.findAllDishes();
        return new BaseResponse(0, "success", result);
    }


    @ApiOperation({ summary: "Find All Dishes By Chef For Foodies", description: "Find All Dishes By Chef For Foodies" })
    @ApiResponse({ status: 200 })
    @ApiParam({ name: 'chefId', description: 'chef Id' })
    @UseGuards(AuthGuard , new RoleGuard(UserRole.FOODIE))
    @Get("/findByChef/:chefId")
    async getAllDishesByChefId(@Param("chefId") chefId: number) {
        let result = await this.dishService.findAllDishesByChef(Number(chefId));
        return new BaseResponse(0, "success", result);
    }


    @ApiOperation({ summary: "Get All Dishes for Chef", description: "Find All Dishes For Chef from Database" })
    @ApiResponse({ status: 200 })
    @UseGuards(AuthGuard , new RoleGuard(UserRole.CHEF))
    @Get("/findAllByChef")
    async getAllDishesForChef(@Req() req : Request) {
        const user : CustomPayload = req["user"];
        let result = await this.dishService.findAllDishesByChef(Number(user.id));
        return new BaseResponse(0, "success", result);
    }
}
