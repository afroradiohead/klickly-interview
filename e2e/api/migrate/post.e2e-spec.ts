import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {MigrateModule} from '../../../src/api/migrate.module';
import {Account} from '../../../src/models/typegoose/account.model';
import {ShopifyService} from '../../../src/common/shopify.service';
import * as mongoose from 'mongoose';

describe('POST api/migrate', () => {
    let server;
    let app: INestApplication;
    const AccountModel = new Account().getModelForClass(Account);
    const shopifyService = new ShopifyService();

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test');
        await mongoose.connection.db.dropDatabase();

        const module = await Test.createTestingModule({
            imports: [MigrateModule],
        })
            .compile();

        server = express();
        app = module.createNestApplication(server);
        await app.init();
    });

    it(`should be able to call /POST api/migrate`, async () => {
        const storeName = 'apple store';
        const response = await request(server)
            .post('/api/migrate')
            .send({ storeName });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            data: JSON.parse(JSON.stringify(await AccountModel.findOne({
                name: storeName,
            }))),
        });
    });

    afterAll(async () => {
        await app.close();
    });
});