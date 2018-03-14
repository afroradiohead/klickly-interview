import {Component} from '@nestjs/common';
import * as crypto from 'crypto';
import * as querystring from 'querystring';
import * as request from 'request';
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

    createHmacHash(query: {code: string; hmac: string; shop: string; state: string; timestamp: number}){
        const map = Object.assign({}, query);
        delete map.hmac;
        const message = querystring.stringify(map);
        const generatedHash = crypto
            .createHmac('sha256', client_password)
            .update(message)
            .digest('hex');

        return generatedHash;

    }

    createAccessTokenPayload(code){
        return  {
            client_id,
            client_secret: client_password,
            code,
        };
    }

    createAccessTokenRequestUrl(shop: string) {
        return 'https://' + shop + '/admin/oauth/access_token';
    }

    async getShopResponse(shop: string, accessToken: string){
        const shopRequestUrl = 'https://' + shop + '/admin/shop.json';
        const shopRequestHeaders = {
            'X-Shopify-Access-Token': accessToken,
        };

        return await request.get(shopRequestUrl, { headers: shopRequestHeaders });
    }

    async getShopResponseFromQuery(query: IShopResponsFromQueryDAO){
        return await {
            shop: {
                id: 690933842,
                name: 'Apple Computers',
                email: 'steve@apple.com',
                domain: 'shop.apple.com',
                created_at: '2007-12-31T19:00:00-05:00',
                province: 'California',
                country: 'US',
                address1: '1 Infinite Loop',
                zip: '95014',
                city: 'Cupertino',
                source: null,
                phone: '1231231234',
                updated_at: '2017-01-05T15:42:01-05:00',
                customer_email: 'customers@apple.com',
                latitude: 45.45,
                longitude: -75.43,
                primary_location_id: null,
                primary_locale: 'en',
                address2: 'Suite 100',
                country_code: 'US',
                country_name: 'United States',
                currency: 'USD',
                timezone: '(GMT-05:00) Eastern Time (US & Canada)',
                iana_timezone: 'America\/New_York',
                shop_owner: 'Steve Jobs',
                money_format: '${{amount}}',
                money_with_currency_format: '${{amount}} USD',
                weight_unit: 'lb',
                province_code: 'CA',
                taxes_included: null,
                tax_shipping: null,
                county_taxes: true,
                plan_display_name: 'Shopify Plus',
                plan_name: 'enterprise',
                has_discounts: false,
                has_gift_cards: true,
                myshopify_domain: 'apple.myshopify.com',
                google_apps_domain: null,
                google_apps_login_enabled: null,
                money_in_emails_format: '${{amount}}',
                money_with_currency_in_emails_format: '${{amount}} USD',
                eligible_for_payments: true,
                requires_extra_payments_agreement: false,
                password_enabled: false,
                has_storefront: true,
                eligible_for_card_reader_giveaway: false,
                finances: true,
                setup_required: false,
                force_ssl: false,
            },
        };
    }

    getDomainByStoreName(storeName: any) {
        return `${_.snakeCase(storeName)}.myshopify.com`;
    }
}