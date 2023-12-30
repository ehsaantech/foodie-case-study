import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './redis.config';

@Module({
    imports : [
        CacheModule.registerAsync(RedisOptions),
    ]
})
export class RedisModule {}
