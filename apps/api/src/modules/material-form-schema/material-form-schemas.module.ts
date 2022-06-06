import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialFormSchemaController } from './material-form-schema.controller';
import { MaterialFormSchemasService } from './material-form-schemas.service';
import { MaterialFormSchema } from '@fm/nest/material-form-schema/interface/material-form-schema.interface';
import { MaterialFormSchema_schema } from './schema/material-form-schema.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MaterialFormSchema.name,
        schema: MaterialFormSchema_schema,
      },
    ]),
  ],
  controllers: [MaterialFormSchemaController],
  providers: [MaterialFormSchemasService],
  exports: [MaterialFormSchemasService],
})
export class MaterialFormSchemasModule {}
