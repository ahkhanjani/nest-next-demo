import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class PreRegEmail {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ unique: true })
  email: string;
}

export const PreRegEmailSchema = SchemaFactory.createForClass(PreRegEmail);
