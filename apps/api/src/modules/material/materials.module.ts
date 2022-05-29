import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// module
import { MaterialsResolver } from './materials.resolver';
import { MaterialsService } from './materials.service';
import { MaterialSchema } from './schema/material.schema';
import { Material } from '@fm/nest/material/interface';
import { MaterialFormSchemasModule } from '../material-form-schema/material-form-schemas.module';
import { MaterialCategoriesModule } from '../material-category/material-categories.module';

@Module({
  imports: [
    MaterialFormSchemasModule,
    MaterialCategoriesModule,
    MongooseModule.forFeatureAsync([
      {
        name: Material.name,
        useFactory: () => {
          const schema = MaterialSchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [MaterialsService, MaterialsResolver],
  exports: [MaterialsService],
})
export class MaterialsModule {}
