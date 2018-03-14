import {Controller, Post, Body, Res, HttpStatus, Get, Param, Query, Req} from '@nestjs/common';
import {IShopResponsFromQueryDAO, ShopifyService} from '../common/shopify.service';
import * as _ from 'lodash';
import {AccountModelService} from '../models/account/account.service';

export interface IGETDAOFORQUERY extends IShopResponsFromQueryDAO {}

@Controller('api/migrate')
export class MigrateController {
    constructor(private readonly shopifyService: ShopifyService, private readonly accountModelService: AccountModelService) {}

    @Get()
    async get(@Req() req, @Res() res, @Query() query: IGETDAOFORQUERY){
        // query.code;
        // query.hmac;
        // query.shop;
        // query.state;
        // query.timestamp;

        // const generatedHash = this.shopifyService.createHmacHash(query);
        //
        // if (generatedHash !== query.hmac) {
        //     return res.status(400).send('HMAC validation failed');
        // }
        //
        // const accessTokenPayload = this.shopifyService.createAccessTokenPayload(query.code);
        // const accessTokenRequestUrl = this.shopifyService.createAccessTokenRequestUrl(query.shop);
        //
        // const accessTokenResponse = await req.post(accessTokenRequestUrl, { json: accessTokenPayload });
        // const accessToken = accessTokenResponse.access_token;
        const shopResponse = this.shopifyService.getShopResponseFromQuery(query);
        let account = await this.accountModelService.accountModel.findOne({domain: shopResponse.shop.domain});
        if (_.isEmpty(account)){
            account = new this.accountModelService.accountModel({
                domain: shopResponse.shop.domain,
            });

            await account.save();
        }

        res.status(200).send(JSON.parse(JSON.stringify(account)));
    }

    @Post()
    async store(@Res() res, @Body() body: {storeName: string}) {
        const domain = this.shopifyService.getDomainByStoreName(body.storeName);
        const account = await this.accountModelService.accountModel.findOne({domain});

        if (_.isEmpty(account)){
            res.redirect(this.shopifyService.getOauthUrlByShopDomain(domain));
        }else{
            res.status(HttpStatus.CREATED).send({
                data: account,
            });
        }
    }
}