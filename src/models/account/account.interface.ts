import {Document} from 'mongoose';

export interface IAccount extends Document {
    name: string;
    shopifyId: number;
    domain: string;
}