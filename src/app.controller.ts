import {Get, Controller, Req, Res} from '@nestjs/common';
import {AccountModelService} from './models/account/account.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Controller()
export class AppController {
    constructor(private readonly accountModelService: AccountModelService) {}


    @Get()
	async index(@Res() res) {
        const accountCollection = await this.accountModelService.accountModel.find().lean();
        const renderedAccountList = _.map(accountCollection, (account) => {
            return {
                ...account,
                createdAtAgo: moment(account.createdAt).fromNow(),
                storeExisistenceDate: moment(account.shopifyCreatedAt).format('MMMM Do YYYY, h:mm:ss a'),
            };
        });

        res.render('index', {renderedAccountList});
  }
}
