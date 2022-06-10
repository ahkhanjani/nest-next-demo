import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class MaterialFormSchema {
  @Prop({ default: Date.now, required: true })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  title: string;

  @Prop()
  strSchema: string;
}

export const MaterialFormSchema_schema =
  SchemaFactory.createForClass(MaterialFormSchema);
