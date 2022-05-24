import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

export type MaterialTypePolicy =
  | 'Simple Text'
  | 'Multiple Choices'
  | 'Information Box'
  | 'Information Card'
  | 'Match Sentence w/ Sentence'
  | 'Match Sentence w/ Image'
  | 'Stressed Syllable'
  | 'Intonation'
  | 'Correct the Mistake in Sentence'
  | 'Order Words'
  | 'Word in Correct Sentence'
  | 'Order Sentences'
  | 'Correct the Word'
  | 'Sentence in Correct Category';

export type StatusPolicy = 'draft' | 'unpublished' | 'published';

@ObjectType()
export class Material {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly type: string;

  @Field()
  readonly title: string;

  @Field()
  readonly status: StatusPolicy;

  @Field(() => [ID])
  readonly category: string[];

  @Field()
  readonly formData: string;
}

export type MaterialModel = Material & Document;
