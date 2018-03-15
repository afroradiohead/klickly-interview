import {Get, Controller, Req, Res} from '@nestjs/common';
import {AccountModelService} from './models/account/account.service';
import {ShopifyService} from './common/shopify.service';

@Controller()
export class AppController {
    constructor(private readonly accountModelService: AccountModelService) {}


    @Get()
	async index(@Res() res) {
        const accountCollection = await this.accountModelService.accountModel.find();

        res.render('index', {accountCollection});
  }
}
