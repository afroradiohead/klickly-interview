import {Controller, Post, Body, Res, HttpStatus, Get} from '@nestjs/common';
import {ShopifyService} from '../common/shopify.service';
import * as _ from 'lodash';

import {AccountModelService} from '../models/account/account.service';

@Controller('api/migrate')
export class MigrateController {
    constructor(private readonly shopifyService: ShopifyService, private readonly accountModelService: AccountModelService) {}

    @Post()
    async store(@Res() res, @Body() body: {storeName: string}) {
        const account = await this.accountModelService.accountModel.findOne({name: body.storeName});

        if (_.isEmpty(account)){
            res.redirect(this.shopifyService.getOauthUrlForStore(body.storeName));
        }else{
            res.status(HttpStatus.CREATED).send({
                data: account,
            });
            // const account = new AccountModel(this.shopifyService.findShopByName(body.storeName));
            // await account.save();
        }
    }
}