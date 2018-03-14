import { Module } from '@nestjs/common';
import { MigrateController } from './migrate.controller';
import {ShopifyService} from '../common/shopify.service';
import {AccountSchema} from '../models/account/account.schema';
import {MongooseModule} from '@nestjs/mongoose';
import {AccountModelService} from '../models/account/account.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
    controllers: [
        MigrateController,
    ],
    components: [ShopifyService, AccountModelService],
})
export class MigrateModule {}