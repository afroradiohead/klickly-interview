import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {MigrateModule} from '../../../src/api/migrate.module';

describe('POST api/migrate', () => {
    let server;
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [MigrateModule],
        })
            .compile();

        server = express();
        app = module.createNestApplication(server);
        await app.init();
    });

    it(`should be able to call /POST api/migrate`, () => {
        return request(server)
            .post('/api/migrate')
            .expect(201);
    });

    afterAll(async () => {
        await app.close();
    });
});