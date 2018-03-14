import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {MigrateModule} from './api/migrate.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), MigrateModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
