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
    const shopifyService = {
        getShopResponseFromQuery : () => {
            return {
                apple: true,
            };
        },
    };
    let accountModelService: AccountModelService;

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test');
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

    it(`should receive the shop response`, async () => {
        const storeName = 'apple-store';

        const response = await request(server)
            .get('/api/migrate')
            .send({ storeName });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(JSON.parse(JSON.stringify(shopifyService.getShopResponseFromQuery())));
    });

    afterAll(async () => {
        await app.close();
    });
});