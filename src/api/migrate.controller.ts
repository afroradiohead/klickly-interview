import {Controller, Post, Body} from '@nestjs/common';
import {Account} from '../models/typegoose/account.model';
import {ShopifyService} from '../common/shopify.service';

@Controller('api/migrate')
export class MigrateController {
    constructor(private readonly shopifyService: ShopifyService) {}

    @Post()
    async store(@Body() body: {storeName: string}) {
        const AccountModel = new Account().getModelForClass(Account);

        const account = new AccountModel(this.shopifyService.findShopByName(body.storeName));
        await account.save();

        return {
            data: account,
        };
    }
}