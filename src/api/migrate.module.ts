import { Module } from '@nestjs/common';
import { MigrateController } from './migrate.controller';
import { MigrateService } from './migrate.service';

@Module({
    controllers: [MigrateController],
    components: [MigrateService],
})
export class MigrateModule {}