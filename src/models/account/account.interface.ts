import {Document} from 'mongoose';

export interface IAccount extends Document {
    domain: string;
}