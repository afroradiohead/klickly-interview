import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/test');

export class Account extends Typegoose {
    @prop({ required: true })
    shopifyShopId: number;

    @prop({ required: true })
    name: string;

    @prop({ required: true })
    domain: string;
}