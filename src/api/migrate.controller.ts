import {Controller, Post, Body, Res, HttpStatus} from '@nestjs/common';
import {Account} from '../models/typegoose/account.model';
import {ShopifyService} from '../common/shopify.service';
import * as _ from 'lodash';

@Controller('api/migrate')
export class MigrateController {
    constructor(private readonly shopifyService: ShopifyService) {}

    @Post()
    async store(@Res() res, @Body() body: {storeName: string}) {
        const AccountModel = new Account().getModelForClass(Account);
        const account = await AccountModel.findOne({
            name: body.storeName,
        });

        if (account){
            res.status(HttpStatus.CREATED).send({
                data: account,
            });
        }else{
            res.redirect(this.shopifyService.getOauthUrlForStore(body.storeName));
            // const account = new AccountModel(this.shopifyService.findShopByName(body.storeName));
            // await account.save();
        }
    }
}