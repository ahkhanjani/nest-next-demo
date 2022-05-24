import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class User {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ unique: true })
  username: string;

  @Prop({ select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
