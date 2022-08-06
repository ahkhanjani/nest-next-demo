import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Session } from './interface/session.interface';
import { SessionsResolver } from './sessions.resolver';
import { SessionsService } from './sessions.service';
import { SessionSchema } from './schema/session.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Session.name,
        useFactory: () => SessionSchema,
      },
    ]),
  ],
  providers: [SessionsResolver, SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
