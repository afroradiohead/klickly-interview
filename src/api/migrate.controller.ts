import {Controller, Post, Body} from '@nestjs/common';
import {Account} from '../models/typegoose/account.model';
import {ShopifyService} from '../common/shopify.service';

@Controller('api/migrate')
export class MigrateController {
    constructor(private readonly shopifyService: ShopifyService) {}

    @Post()
    async store(@Body() body) {
        const AccountModel = new Account().getModelForClass(Account);

        const account = new AccountModel(this.shopifyService.findShopByName());
        await account.save();

        return {
            data: account,
        };
    }
}