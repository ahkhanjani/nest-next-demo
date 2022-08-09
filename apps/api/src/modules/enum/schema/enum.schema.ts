import { ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Enum {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ type: () => ID })
  creatorId: string;

  @Prop()
  enumTitle: string;

  @Prop()
  value: string;
}

export const EnumSchema = SchemaFactory.createForClass(Enum);
