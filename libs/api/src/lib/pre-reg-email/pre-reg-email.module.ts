import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreRegEmail } from './interface/pre-reg-email.interface';
import { PreRegEmailsResolver } from './pre-reg-email.resolver';
import { PreRegEmailsService } from './pre-reg-email.service';
import { PreRegEmailSchema } from './schema/pre-reg-email.schema';
import { IsEmailAlreadyExistingConstraint } from './validator';

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
