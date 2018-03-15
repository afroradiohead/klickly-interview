import {Component} from '@nestjs/common';
import * as crypto from 'crypto';
import * as querystring from 'querystring';
import * as request from 'request-promise';
import * as _ from 'lodash';

export interface IQueryDAO {
    code: string; hmac: string; shop: string; state: string; timestamp: string;
}

@Component()
export class ShopifyService {
    readonly client_id = process.env.SHOPIFY_API_KEY;
    readonly client_password = process.env.SHOPIFY_API_SECRET;
    readonly redirect_uri = process.env.SHOPIFY_REDIRECT_URI;
    readonly scopes = 'read_content';
    readonly nonce = 'sdiofn13r4fr09vj4q';

    /**
     *
     * @param domain
     * @returns {string}
     */
    getOauthUrlByShopDomain(domain){
        const query = querystring.stringify({
            client_id: this.client_id,
            scope: this.scopes,
            redirect_uri: this.redirect_uri,
            state: this.nonce,
        });
        return `https://${domain}/admin/oauth/authorize?${query}`;
    }

    /**
     *
     * @param {IQueryDAO} query
     * @returns {string}
     */
    createHmacHash(query: IQueryDAO){
        return crypto
            .createHmac('sha256', this.client_password)
            .update(querystring.stringify(_.omit(query, ['hmac'])))
            .digest('hex');

    }

    /**
     *
     * @param {string} storeName
     * @returns {string}
     */
    getDomainByStoreName(storeName: string) {
        return `${_.kebabCase(storeName)}.myshopify.com`;
    }

    /**
     * @todo make request testable
     * @param {string} shop
     * @param {string} accessToken
     * @returns {Promise<any>}
     */
    async getShopResponse(shop: string, accessToken: string){
        return JSON.parse(await request.get(`https://${shop}/admin/shop.json`, { headers: {
            'X-Shopify-Access-Token': accessToken,
        }}));
    }

    /**
     * @todo make request testable
     * @param {IQueryDAO} query
     * @returns {Promise<any>}
     */
    async getShopResponseFromQuery(query: IQueryDAO){
        const generatedHash = this.createHmacHash(query);

        if (generatedHash !== query.hmac) {
            throw new Error('HMAC validation failed');
        }

        const accessTokenRequestUrl = `https://${query.shop}/admin/oauth/access_token`;
        const accessTokenResponse = await request.post(accessTokenRequestUrl, {
            json: {
                client_id: this.client_id,
                client_secret: this.client_password,
                code: query.code,
            },
        });
        const accessToken = accessTokenResponse.access_token;

        return await this.getShopResponse(query.shop, accessToken);
    }
}