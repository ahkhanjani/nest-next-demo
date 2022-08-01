import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';

import { MaterialsModule } from '../modules/material/materials.module';
import { MaterialCategoriesModule } from '../modules/material-category/material-categories.module';
import { UsersModule } from '../modules/user/users.module';
import { AuthModule } from '../modules/auth/auth.module';
import { PreRegEmailsModule } from '../modules/pre-reg-email/pre-reg-email.module';

import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
      cache: true,
    }),

    // used code first approach: https://docs.nestjs.com/graphql/quick-start#code-first
    // will auto-generate schema file
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      sortSchema: true,
      csrfPrevention: true,
      cors: {
        origin: ['http://localhost:4200'],
        credentials: true,
      },
    }),

    // link server to database
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/fm-db', {
      useNewUrlParser: true,
      // authSource: 'admin',
    }),

    // ____ custom ____
    MaterialsModule,
    MaterialCategoriesModule,
    UsersModule,
    AuthModule,
    PreRegEmailsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
