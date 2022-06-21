import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class MaterialCategory {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  title: string;

  @Prop({ required: false })
  parentId: string;
}

export const MaterialCategorySchema =
  SchemaFactory.createForClass(MaterialCategory);
