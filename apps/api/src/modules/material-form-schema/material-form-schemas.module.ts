import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialFormSchemasController } from './material-form-schemas.controller';
import { MaterialFormSchemasService } from './material-form-schemas.service';
import { MaterialFormSchema_schema } from './schema/material-form-schema.schema';
import { MaterialFormSchemasResolver } from './material-form-schemas.resolver';
import { MaterialFormSchema } from './interface/material-form-schema.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MaterialFormSchema.name,
        schema: MaterialFormSchema_schema,
      },
    ]),
  ],
  controllers: [MaterialFormSchemasController],
  providers: [MaterialFormSchemasService, MaterialFormSchemasResolver],
  exports: [MaterialFormSchemasService],
})
export class MaterialFormSchemasModule {}
