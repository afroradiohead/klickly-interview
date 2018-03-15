require('dotenv').config();
import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {MigrateModule} from '../../../src/api/migrate.module';
import {IQueryDAO, ShopifyService} from '../../../src/common/shopify/shopify.service';
import * as mongoose from 'mongoose';
import * as https from 'https';
import {AccountModelService} from '../../../src/models/account/account.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ApplicationModule} from '../../../src/app.module';
import {AccountSchema} from '../../../src/models/account/account.schema';
import {IGetQueryDAO} from '../../../src/api/migrate.controller';

describe('GET api/migrate', () => {
    let server;
    let app: INestApplication;
    const shopifyService = {
        getShopResponseFromQuery : (query: IQueryDAO) => {
            return {
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
        },
    };
    let accountModelService: AccountModelService;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
        await mongoose.connection.db.dropDatabase();

        const module = await Test.createTestingModule({
            imports: [ApplicationModule, MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
            components: [ShopifyService, AccountModelService],
        })
            .overrideComponent(ShopifyService)
            .useValue(shopifyService)
            .compile();

        server = express();
        app = module.createNestApplication(server);
        await app.init();

        accountModelService = module.get<AccountModelService>(AccountModelService);
    });

    it(`should receive the shop response and save new entry in database`, async () => {
        const shopResponseQuery: IQueryDAO = {code: 'asdfsadf', hmac: 'asdfds', shop: 'asdfasdf', state: 'asdfsadf', timestamp: '123'};
        const query: IGetQueryDAO = shopResponseQuery;

        const shopResponse = shopifyService.getShopResponseFromQuery(shopResponseQuery);
        const response = await request(server)
            .get('/api/migrate')
            .query(query);

        const accountCount = await accountModelService.accountModel.count({domain: shopResponse.shop.domain});
        expect(response.statusCode).toBe(302);
        expect(accountCount).toEqual(1);
    });

    afterAll(async () => {
        await app.close();
    });
});