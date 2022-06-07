import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// controllers, providers
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
// modules
import { MaterialsModule } from '../modules/material/materials.module';
import { UsersModule } from '../modules/user/users.module';
import { AuthModule } from '../modules/auth/auth.module';
import { PreRegEmailsModule } from '../modules/pre-reg-email/pre-reg-email.module';
import { MaterialCategoriesModule } from '../modules/material-category/material-categories.module';
import { MaterialFormSchemasModule } from '../modules/material-form-schema/material-form-schemas.module';

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
  providers: [AppService, AppResolver],
})
export class AppModule {}
