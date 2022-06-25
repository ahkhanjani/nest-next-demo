import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// controllers, providers
import { AppController } from './app.controller';
// modules
import { MaterialsModule } from '../modules/material/materials.module';
import { MaterialCategoriesModule } from '../modules/material-category/material-categories.module';
import { UsersModule } from '../modules/user/users.module';
import { AuthModule } from '../modules/auth/auth.module';
import { PreRegEmailsModule } from '../modules/pre-reg-email/pre-reg-email.module';

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
    UsersModule,
    AuthModule,
    PreRegEmailsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
