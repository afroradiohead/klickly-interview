import {Controller, Post, Body, Res, HttpStatus, Get, Param, Query, Req} from '@nestjs/common';
import {IQueryDAO, ShopifyService} from '../common/shopify/shopify.service';
import * as _ from 'lodash';
import {AccountModelService} from '../models/account/account.service';

export interface IGetQueryDAO extends IQueryDAO {}

@Controller('api/migrate')
export class MigrateController {
    constructor(private readonly shopifyService: ShopifyService, private readonly accountModelService: AccountModelService) {}

    /**
     *
     * @param req
     * @param res
     * @param {IGetQueryDAO} query
     * @returns {Promise<void>}
     */
    @Get()
    async get(@Req() req, @Res() res, @Query() query: IGetQueryDAO){
        const shopResponse = await this.shopifyService.getShopResponseFromQuery(query);

        await this.accountModelService.accountModel.findOneAndUpdate({
            domain: shopResponse.shop.domain,
        }, {
            domain: shopResponse.shop.domain,
            shopifyCreatedAt: shopResponse.shop.created_at,
            name: shopResponse.shop.name,
        }, {
            upsert: true,
        });

        res.redirect('/');
    }

    /**
     *
     * @param res
     * @param {{storeName: string}} body
     * @returns {Promise<void>}
     */
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