import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    domain: String,
    name: String,
    shopifyCreatedAt: Date,
}, {
    timestamps: true,
});