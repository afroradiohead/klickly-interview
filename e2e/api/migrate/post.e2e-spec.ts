import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {MigrateModule} from '../../../src/api/migrate.module';
import {ShopifyService} from '../../../src/common/shopify.service';
import * as mongoose from 'mongoose';
import * as https from 'https';
import {AccountModelService} from '../../../src/models/account/account.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ApplicationModule} from '../../../src/app.module';
import {AccountSchema} from '../../../src/models/account/account.schema';

describe('POST api/migrate', () => {
    let server;
    let app: INestApplication;
    const shopifyService = new ShopifyService();
    let accountModelService:AccountModelService;

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test');
        await mongoose.connection.db.dropDatabase();

        const module = await Test.createTestingModule({
            imports: [ApplicationModule, MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
            components: [ShopifyService, AccountModelService],
        })
            .compile();

        server = express();
        app = module.createNestApplication(server);
        await app.init();

        accountModelService = module.get<AccountModelService>(AccountModelService);
    });

    it(`should return an account | if an account with name == storename exists`, async () => {
        const storeName = 'apple-store';

        await accountModelService.accountModel.create({shopifyShopId: 123, name: storeName, domain: 'adsfsafd'});
        const response = await request(server)
            .post('/api/migrate')
            .send({ storeName });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            data: JSON.parse(JSON.stringify(await accountModelService.accountModel.findOne({name: storeName}))),
        });
    });

    it(`should redirect to oauth | if an account with name == storename does not exist`, async () => {
        const storeName = 'randomstorenamethatdoesntexistindatabase';
        const response = await request(server)
            .post('/api/migrate')
            .send({ storeName });

        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe(shopifyService.getOauthUrlForStore(storeName));
    });

    afterAll(async () => {
        await app.close();
    });
});