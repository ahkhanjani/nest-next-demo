import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UserSchema } from '@fm/nest/user/model';
import { IsUserAlreadyExistingConstraint } from '@fm/nest/user/validator';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'users',
        useFactory: () => {
          const schema = UserSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-unique-validator'), {
            message: 'already taken.',
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [UsersResolver, UsersService, IsUserAlreadyExistingConstraint],
  exports: [UsersService],
})
export class UsersModule {}
