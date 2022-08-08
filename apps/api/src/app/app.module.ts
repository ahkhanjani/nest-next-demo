import { CacheModule, Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

import configuration from '../config/configuration';

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
      useFactory: async (configService: ConfigService) => ({
        installSubscriptionHandlers: true,
        autoSchemaFile: true,
        sortSchema: true,
        csrfPrevention: true,
        cors: {
          origin: configService.get<string[]>('cors.apollo.origins'),
          allowedHeaders: configService.get<string[]>('cors.apollo.headers'),
          credentials: true,
        },
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),

    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        socket: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
        },
      }),
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
  controllers: [AppController],
})
export class AppModule {}
