import { Module } from '@nestjs/common';
import { MaterialFormSchemaController } from './material-form-schema.controller';
// module
import { MaterialFormSchemasService } from './material-form-schemas.service';

@Module({
  imports: [],
  controllers: [MaterialFormSchemaController],
  providers: [MaterialFormSchemasService],
  exports: [MaterialFormSchemasService],
})
export class MaterialFormSchemasModule {}
