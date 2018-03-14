import {Controller, Post, Body, Res, HttpStatus, Get, Param, Query, Req} from '@nestjs/common';
import {ShopifyService} from '../common/shopify.service';
import * as _ from 'lodash';
import {AccountModelService} from '../models/account/account.service';
import * as querystring from 'querystring';
import * as crypto from 'crypto';

@Controller('api/migrate')
export class MigrateController {
    constructor(private readonly shopifyService: ShopifyService, private readonly accountModelService: AccountModelService) {}

    @Get()
    async get(@Req() req, @Res() res, @Query() query: {code: string; hmac: string; shop: string; state: string; timestamp: number}){
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
        // const shopResponse = this.shopifyService.getShopResponse(query.shop, accessToken);
        //
        // // const account = new AccountModel(this.shopifyService.findShopByName(body.storeName));
        // // await account.save();
        //
        // res.status(200).send(shopResponse);
        res.status(200).send(this.shopifyService.getShopResponseFromQuery());
    }

    @Post()
    async store(@Res() res, @Body() body: {storeName: string}) {
        const account = await this.accountModelService.accountModel.findOne({name: body.storeName});

        if (_.isEmpty(account)){
            res.redirect(this.shopifyService.getOauthUrlForStore(body.storeName));
        }else{
            res.status(HttpStatus.CREATED).send({
                data: account,
            });
        }
    }
}