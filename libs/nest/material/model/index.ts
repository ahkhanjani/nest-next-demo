import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MaterialTypePolicy, MaterialStatusPolicy } from '../interface';

@Schema()
class Material {
  @Prop({ default: Date.now })
  readonly createdAt: Date;

  @Prop()
  readonly type: string;

  @Prop()
  readonly title: string;

  @Prop()
  readonly status: string;

  @Prop()
  readonly category: string[];

  @Prop()
  readonly formData: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
