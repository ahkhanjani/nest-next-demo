import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreRegEmailSchema } from './models/pre-reg-email.schema';
import { PreRegEmailsResolver } from './pre-reg-email.resolver';
import { PreRegEmailsService } from './pre-reg-email.service';
import { IsEmailAlreadyExistingConstraint } from './validators';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'pre-reg-emails',
        useFactory: () => {
          const schema = PreRegEmailSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-unique-validator'), {
            message: 'already taken.',
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [
    PreRegEmailsResolver,
    PreRegEmailsService,
    IsEmailAlreadyExistingConstraint,
  ],
  exports: [PreRegEmailsService],
})
export class PreRegEmailsModule {}
