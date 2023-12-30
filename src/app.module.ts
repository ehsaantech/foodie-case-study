import { Inject, MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { LoggerModule } from './core/logger/logger.module';
import { LoggerService } from './core/logger/logger.service';
import { DatabaseModule } from './core/database/database.module';
import { DishModule } from './api/dish/dish.module';
import { OrderModule } from './api/order/order.module';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { LoggerMiddleware } from './core/middleware/logger.middleware';
import { RedisModule } from './core/redis/redis.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    // ChefModule,
    // FoodieModule,
    DishModule,
    OrderModule,
    UserModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  constructor(private readonly logger: LoggerService , @Inject(CACHE_MANAGER) private readonly cache : Cache) {
    this.logger.log("Injecting Root Module");
    this.cache.reset();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("dish" , "auth" , "order" , "user")
  }

}
