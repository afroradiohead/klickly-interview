require('dotenv').config();
import { Test } from '@nestjs/testing';
import {ShopifyService} from './shopify.service';
import * as querystring from 'querystring';
import * as crypto from 'crypto';

describe('CatsController', () => {
    let shopifyService: ShopifyService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            components: [ShopifyService],
        }).compile();

        shopifyService = module.get<ShopifyService>(ShopifyService);
    });

    describe('getOauthUrlByShopDomain', () => {
        it('should return oauth url by shop domain', () => {
            const query = querystring.stringify({
                client_id: shopifyService.client_id,
                scope: shopifyService.scopes,
                redirect_uri: shopifyService.redirect_uri,
                state: shopifyService.nonce,
            });
            const domain = 'asdfasdf.coasdf.com';
            const expectedValue = `https://${domain}/admin/oauth/authorize?${query}`;

            expect(shopifyService.getOauthUrlByShopDomain(domain)).toBe(expectedValue);
        });
    });

    describe('createHmacHash', () => {
        it('should return the hmac hash', () => {
            const hmacableQuery = {
                code: 'dsf32rfe94rfresd', shop: 'mystore@store.com', state: 'asdfsdf3131', timestamp: new Date().getTime().toString(),
            };
            const expectedHmac = crypto
                .createHmac('sha256', shopifyService.client_password)
                .update(querystring.stringify(hmacableQuery))
                .digest('hex');
            expect(shopifyService.createHmacHash( {...hmacableQuery, hmac: expectedHmac})).toBe(expectedHmac);
        });
    });

    describe('getDomainByStoreName', () => {
        it('should return domain', () => {
            const storeName = 'cheese its';
            const expectedDomain = 'cheese-its.myshopify.com';
            expect(shopifyService.getDomainByStoreName(storeName)).toBe(expectedDomain);
        });
    });

});