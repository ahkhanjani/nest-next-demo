import { forwardRef, Module } from '@nestjs/common';
import { MaterialCategoriesModule } from '../material-category/material-categories.module';
// module
import { MaterialFormSchemasResolver } from './material-form-schemas.resolver';
import { MaterialFormSchemasService } from './material-form-schemas.service';

@Module({
  imports: [forwardRef(() => MaterialCategoriesModule)],
  providers: [MaterialFormSchemasService, MaterialFormSchemasResolver],
  exports: [MaterialFormSchemasService],
})
export class MaterialFormSchemasModule {}
