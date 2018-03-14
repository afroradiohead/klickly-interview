import {MongooseModule} from '@nestjs/mongoose';
import {Module} from '@nestjs/common';
import {AccountModelService} from './account.service';
import {AccountSchema} from './account.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
    components: [AccountModelService],
})
export class AccountModelModule {}