import {Get, Controller, Req, Res} from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	root() {
		return `
		<form action="/api/migrate" method="POST">
			<label>Store Name</label> <input name="storeName" type="text" />
			<button type="submit">Migrate</button>
		</form>
		`;
  }
}
