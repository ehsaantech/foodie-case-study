import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/create-order.dto';
import { DatabaseService } from 'src/core/database/database.service';
import { OrderMapper } from 'src/core/mappers/order.mapper';

@Injectable()
export class OrderService {

  constructor(private readonly database: DatabaseService) { }

  async create(orderDto: OrderDto , foodieId : number) {

    let payment = OrderMapper.dtoToPaymentMapper(orderDto); //  payment
    let dishes = OrderMapper.dishesMapper(orderDto); // dishes

    let order = await this.database.orders.create({
      data: {
        address: orderDto.address,
        payment: {
          create: payment
        },
        user: {
          connect: { Id: foodieId }
        },
        dish_orders: {
          createMany: {
            data: dishes
          }
        }
      }
    })
    return order;
  }

}
