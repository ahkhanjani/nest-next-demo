// nest
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// modules
import { MaterialCategoriesResolver } from './material-categories.resolver';
import { MaterialCategoriesService } from './material-categories.service';
import { MaterialCategorySchema } from './models/material-category.schema';
import { IsMaterialCategoryAlreadyExistingConstraint } from './validators';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'material-categories',
        useFactory: () => {
          const schema = MaterialCategorySchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [
    MaterialCategoriesService,
    MaterialCategoriesResolver,
    IsMaterialCategoryAlreadyExistingConstraint,
  ],
  exports: [MaterialCategoriesService],
})
export class MaterialCategoriesModule {}