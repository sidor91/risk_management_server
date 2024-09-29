import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType({ description: 'risk category' })
export class Category extends Document {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  description: string;

  @Prop({ required: true })
  @Field()
  createdBy: string;
}

@ObjectType()
export class PaginatedCategoryResponseSchema {
  @Field(() => [Category])
  items: Category[];

  @Field(() => Float)
  total: number;
}

export const RiskCategorySchema = SchemaFactory.createForClass(Category);
