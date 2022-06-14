import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialCategory } from './interface/material-category.interface';
// module
import { MaterialCategoriesResolver } from './material-categories.resolver';
import { MaterialCategoriesService } from './material-categories.service';
import { MaterialCategorySchema } from './schema/material-category.schema';
import { IsMaterialCategoryAlreadyExistingConstraint } from './validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MaterialCategory.name,
        schema: MaterialCategorySchema,
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
