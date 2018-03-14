import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {MigrateModule} from './api/migrate.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/test'), MigrateModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
