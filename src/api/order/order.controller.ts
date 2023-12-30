import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto, orderZodSchema } from './dto/create-order.dto';
import { ApiOperation, ApiResponse, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/core/validation/zod.pipe';
import BaseResponse from 'src/core/models/BaseResponse';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { UserRole } from '@prisma/client';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags("Orders")
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @ApiOperation({ summary: "Place Order", description: "Place Order" })
  @ApiResponse({ status: 201 })
  @ApiBody({ required: true })
  @UsePipes(new ZodValidationPipe(orderZodSchema))
  @UseGuards(AuthGuard,new RoleGuard(UserRole.FOODIE))
  @Post("/place")
  async create(@Body() createOrderDto: OrderDto, @Req() request : Request) {
    const {id} = request["user"]
    let result = await this.orderService.create(createOrderDto , id);
    return new BaseResponse(0,"success", result);
  }

}
