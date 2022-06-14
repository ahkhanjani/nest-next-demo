import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Material } from './interface/material.interface';
// module
import { MaterialsResolver } from './materials.resolver';
import { MaterialsService } from './materials.service';
import { MaterialSchema } from './schema/material.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Material.name,
        schema: MaterialSchema,
      },
    ]),
  ],
  providers: [MaterialsService, MaterialsResolver],
  exports: [MaterialsService],
})
export class MaterialsModule {}
