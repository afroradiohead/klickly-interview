import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {MigrateModule} from './api/migrate.module';
import { MongooseModule } from '@nestjs/mongoose';
import {AccountModelService} from './models/account/account.service';
import {AccountSchema} from './models/account/account.schema';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]), MigrateModule],
  controllers: [AppController],
  components: [AccountModelService],
})
export class ApplicationModule {}
