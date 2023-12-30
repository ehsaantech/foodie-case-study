import {Dishes, Users } from "@prisma/client";
import { ChefResponse } from "../models/ChefResponse";
import { DishDto } from "src/api/dish/dto/dist.dto";
import { AllDishesResponse, DishesResponse } from "../models/DishResponse";

export class DishMapper {
    public static dtoToDatabaseMapper(dto: DishDto,chefId : number): Omit<Dishes, "Id"> {
        return {
            chefId : chefId,
            description : dto.description,
            image : dto.image,
            name : dto.name,
            price : dto.price
        }
    }

    public static dbToAllDishesMapper(dish : Dishes , user : Users): AllDishesResponse {
        return {
            id : dish.Id,
            description : dish.description,
            image : dish.image,
            name : dish.name,
            price : dish.price,
            chef : {
                firstName : user.firstName,
                lastName : user.lastName,
                id : user.Id
            }
        }
    }

    public static dbToChefDishesMapper(dish : Dishes): DishesResponse {
        return {
            id : dish.Id,
            description : dish.description,
            image : dish.image,
            name : dish.name,
            price : dish.price
        }
    }

}