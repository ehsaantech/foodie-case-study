import {DishesOrders, Orders, Payments } from "@prisma/client";
import { OrderDto } from "src/api/order/dto/create-order.dto";

export class OrderMapper {

    public static dtoToPaymentMapper(orderDto: OrderDto): Omit<Payments, "Id"> {
        return {
            paidAmount: orderDto.paidAmount,
            totalAmount: orderDto.totalAmount
        }
    }

    public static dishesMapper(orderDto: OrderDto): Omit<DishesOrders, "orderId">[] {
        return orderDto.dishes.map((dish) => {
            return {
                dishId: dish.id,
                quantity: dish.quantity,
            }
        })
    }

}