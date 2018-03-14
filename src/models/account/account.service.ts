import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {IAccount} from './account.interface';
import {AccountSchema} from './account.schema';
import {Component} from '@nestjs/common';

@Component()
export class AccountModelService {
    constructor(@InjectModel(AccountSchema) public readonly accountModel: Model<IAccount>) {}

    // async findByName(name: string): Promise<IAccount> {
    //     return await this.accountModel.findOne({name: name});
    // }
}