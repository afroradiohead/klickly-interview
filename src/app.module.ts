import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {MigrateModule} from './api/migrate.module';

@Module({
  imports: [MigrateModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
