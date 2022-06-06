import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreRegEmailsResolver } from './pre-reg-email.resolver';
import { PreRegEmailsService } from './pre-reg-email.service';
import { PreRegEmailSchema } from './schema/pre-reg-email.schema';
import { IsEmailAlreadyExistingConstraint } from '@fm/nest/pre-reg-email/validator';
import { PreRegEmail } from '@fm/nest/pre-reg-email/interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PreRegEmail.name,
        schema: PreRegEmailSchema,
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
