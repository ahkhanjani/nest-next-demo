// nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  MaterialTypePolicy,
  StatusPolicy,
} from '../interfaces/material.interface';

@Schema()
class Material {
  @Prop({ default: Date.now })
  readonly createdAt: Date;

  @Prop()
  readonly type: MaterialTypePolicy;

  @Prop()
  readonly title: string;

  @Prop()
  readonly status: StatusPolicy;

  @Prop()
  readonly category: string[];

  @Prop()
  readonly formData: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
