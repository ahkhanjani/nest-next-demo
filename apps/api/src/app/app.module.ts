import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// controllers, providers
import { AppController } from './app.controller';
// modules
import {
  AuthModule,
  MaterialCategoriesModule,
  MaterialFormSchemasModule,
  MaterialsModule,
  PreRegEmailsModule,
  UsersModule,
} from '@fm/api-lib';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // used code first approach: https://docs.nestjs.com/graphql/quick-start#code-first
    // will auto-generate schema file
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      sortSchema: true,
    }),

    // link server to database
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      // authSource: 'admin',
    }),

    // ____ custom ____
    MaterialsModule,
    MaterialCategoriesModule,
    MaterialFormSchemasModule,
    UsersModule,
    AuthModule,
    PreRegEmailsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
