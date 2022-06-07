import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class MaterialFormSchema {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  title: string;

  @Prop()
  strSchema: string;
}

export const MaterialFormSchema_schema =
  SchemaFactory.createForClass(MaterialFormSchema);
