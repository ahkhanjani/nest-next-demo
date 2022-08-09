import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Enum } from './interface/enum.interface';
import { EnumsResolver } from './enums.resolver';
import { EnumsService } from './enums.service';
import { EnumSchema } from './schema/enum.schema';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Enum.name,
        useFactory: () => EnumSchema,
      },
    ]),

    UsersModule,
  ],
  providers: [EnumsResolver, EnumsService],
  exports: [EnumsService],
})
export class EnumsModule {}
