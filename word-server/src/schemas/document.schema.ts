/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DocDocument = HydratedDocument<Doc>;

@Schema()
export class Doc {
  @Prop()
  _id: string;

  @Prop()
  docId: string;

  @Prop({type: Object})
  data: Object;
}
export const DocSchema = SchemaFactory.createForClass(Doc);
