import {Component} from '@nestjs/common';
import * as crypto from 'crypto';
import * as querystring from 'querystring';
import * as request from 'request-promise';
import * as _ from 'lodash';

const client_id = '525eef020db642e3cf017eb51c2a351a';
const client_password = 'b90b1f2ec40e7d07853701de7175bc25';
const scopes = 'read_content';
const nonce = 'sdiofn13r4fr09vj4q';
const redirect_uri = 'http://localhost:3000/api/migrate';

export interface IShopResponsFromQueryDAO {
    code: string; hmac: string; shop: string; state: string; timestamp: string;
}

@Component()
export class ShopifyService {
    getOauthUrlByShopDomain(domain){
        return `https://${domain}/admin/oauth/authorize?client_id=${client_id}&amp;scope=${scopes}&amp;redirect_uri=${redirect_uri}&amp;state=${nonce}&amp;`;

    }

    createHmacHash(query: IShopResponsFromQueryDAO){
        const map = Object.assign({}, query);
        delete map.hmac;
        const message = querystring.stringify(map);
        const generatedHash = crypto
            .createHmac('sha256', client_password)
            .update(message)
            .digest('hex');

        return generatedHash;

    }

    async getShopResponse(shop: string, accessToken: string){
        const shopRequestUrl = 'https://' + shop + '/admin/shop.json';
        const shopRequestHeaders = {
            'X-Shopify-Access-Token': accessToken,
        };

        return JSON.parse(await request.get(shopRequestUrl, { headers: shopRequestHeaders }));
    }

    async getShopResponseFromQuery(query: IShopResponsFromQueryDAO){
        const generatedHash = this.createHmacHash(query);

        if (generatedHash !== query.hmac) {
            throw new Error('HMAC validation failed');
            // return res.status(400).send('HMAC validation failed');
        }

        const accessTokenRequestUrl = `https://${query.shop}/admin/oauth/access_token`;
        const accessTokenResponse = await request.post(accessTokenRequestUrl, {
            json: {
                client_id,
                client_secret: client_password,
                code: query.code,
            },
        });
        const accessToken = accessTokenResponse.access_token;

        return await this.getShopResponse(query.shop, accessToken);
    }

    getDomainByStoreName(storeName: any) {
        return `${_.snakeCase(storeName)}.myshopify.com`;
    }
}