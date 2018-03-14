import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    name: String,
    shopifyId: Number,
    domain: String,
});