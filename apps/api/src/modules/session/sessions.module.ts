import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Session } from './interface/session.interface';
import { SessionsResolver } from './sessions.resolver';
import { SessionsService } from './sessions.service';
import { SessionSchema } from './schema/session.schema';
import { UsersModule } from '../user/users.module';
import { EnumsModule } from '../enum/enums.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Session.name,
        useFactory: () => SessionSchema,
      },
    ]),

    UsersModule,
    EnumsModule,
  ],
  providers: [SessionsResolver, SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
