import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import Keyv from 'keyv';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { ApolloServerPluginCacheControl } from 'apollo-server-core/dist/plugin/cacheControl';

import configuration, { type Config } from '../config/configuration';

import { AppController } from './app.controller';

import { MaterialsModule } from '../modules/material/materials.module';
import { MaterialCategoriesModule } from '../modules/material-category/material-categories.module';
import { UsersModule } from '../modules/user/users.module';
import { AuthModule } from '../modules/auth/auth.module';
import { PreRegEmailsModule } from '../modules/pre-reg-email/pre-reg-email.module';
import { SessionsModule } from '../modules/session/sessions.module';
import { EnumsModule } from '../modules/enum/enums.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
      cache: true,
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => {
        const corsApolloConfig =
          configService.get<Config['cors']['apollo']>('cors.apollo');
        const redisConfig = configService.get<Config['redis']>('redis');
        const cacheConfig = configService.get<Config['cache']>('cache');

        return {
          installSubscriptionHandlers: true,
          autoSchemaFile: true,
          sortSchema: true,
          csrfPrevention: true,

          cors: {
            origin: corsApolloConfig.origins,
            allowedHeaders: corsApolloConfig.headers,
            credentials: true,
          },

          cache: new KeyvAdapter(
            new Keyv(
              `redis://${redisConfig.username}:${redisConfig.password}@${redisConfig.host}:${redisConfig.port}`,
              {
                adapter: 'redis',
                namespace: cacheConfig.namespace,
                ttl: cacheConfig.ttl,
              }
            )
          ),

          plugins: [
            ApolloServerPluginCacheControl({ defaultMaxAge: 30 }),
            responseCachePlugin(),
          ],
        };
      },
      inject: [ConfigService],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoConfig = configService.get<Config['mongo']>('mongo');

        return {
          uri: mongoConfig.uri,
          useNewUrlParser: true,
        };
      },
      inject: [ConfigService],
    }),

    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get<Config['redis']>('redis');
        const cacheConfig = configService.get<Config['cache']>('cache');

        return {
          isGlobal: true,
          name: cacheConfig.namespace,
          store: redisStore,
          ttl: cacheConfig.ttl,
          socket: {
            host: redisConfig.host,
            port: redisConfig.port,
          },
        };
      },
      inject: [ConfigService],
    }),

    MaterialsModule,
    MaterialCategoriesModule,
    UsersModule,
    AuthModule,
    PreRegEmailsModule,
    SessionsModule,
    EnumsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
