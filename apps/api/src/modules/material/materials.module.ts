import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// module
import { MaterialsResolver } from './materials.resolver';
import { MaterialsService } from './materials.service';
import { MaterialSchema } from './schema/material.schema';
import { Material } from '@fm/nest/material/interface';

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
