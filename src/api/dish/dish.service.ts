import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DishDto } from './dto/dist.dto';
import { UserRole } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LoggerService } from '../../core/logger/logger.service';
import { DatabaseService } from '../../core/database/database.service';
import { DishMapper } from '../../core/mappers/dish.mapper';
import { AllDishesResponse } from '../../core/models/DishResponse';

@Injectable()
export class DishService {


    constructor(
        private readonly logger: LoggerService,
        private readonly database: DatabaseService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }


    async addDish(dto: DishDto, chefId: number) {
        let dish = await this.database.dishes.create({
            include: { user: true },
            data: DishMapper.dtoToDatabaseMapper(dto, chefId)
        });

        const dishes = await this.cacheManager.get<AllDishesResponse[]>("dishes");
        if (dishes) {
            dishes.push(DishMapper.dbToAllDishesMapper(dish, dish.user));
            this.cacheManager.set("dishes", dishes);
        }
        return dish;
    }


    async findAllDishes() {
        let data = await this.cacheManager.get<AllDishesResponse[]>("dishes");
        if (data) {
            this.logger.log("Cache Hit");
            return data;
        }

        let result: AllDishesResponse[] = (await this.database.dishes.findMany({
            where: {
                user: {
                    role: UserRole.CHEF
                }
            },
            include: {
                user: true
            }
        })).map((dish) => DishMapper.dbToAllDishesMapper(dish, dish.user));
        this.cacheManager.set("dishes", result);
        this.logger.log("Cache Miss");
        return result;
    }


    async findAllDishesByChef(chefId: number) {
        let result = (await this.database.dishes.findMany({
            include: { user: true },
            where: { user: { Id: chefId } }
        })).map((dish) => DishMapper.dbToChefDishesMapper(dish));

        return result;
    }




}
