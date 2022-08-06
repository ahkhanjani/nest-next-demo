import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './schema/user.schema';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

import { IsUserAlreadyExistingConstraint } from './validator';
import { User } from './interface/user.interface';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => UserSchema,
      },
    ]),
  ],
  providers: [UsersResolver, UsersService, IsUserAlreadyExistingConstraint],
  exports: [UsersService],
})
export class UsersModule {}
