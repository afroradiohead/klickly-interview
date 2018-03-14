import {Get, Controller, Req, Res} from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	root(@Res() response) {

  }
}
