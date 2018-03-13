import { Module } from '@nestjs/common';
import { MigrateController } from './migrate.controller';
import {ShopifyService} from '../common/shopify.service';

@Module({
    controllers: [MigrateController],
    components: [ShopifyService],
})
export class MigrateModule {}