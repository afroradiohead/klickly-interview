import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import * as mongoose from 'mongoose';

class User extends Typegoose {
    @prop()
    name?: string;

    @prop({ required: true })
    age: number;
}