import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/risk_category/risk_category.schema';

@Schema({ timestamps: true })
@ObjectType({ description: 'risk item' })
export class Risk extends Document {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  description: string;

  @Prop({ required: true, type: String })
  @Field(() => ID)
  categoryId: string;

  @Prop({ required: false, type: Boolean, default: false })
  @Field({ nullable: true })
  resolved?: boolean;

  @Prop({ required: true })
  @Field()
  createdBy: string;

  @Field(() => Category)
  category: Category;
}

export const RiskItemSchema = SchemaFactory.createForClass(Risk);
