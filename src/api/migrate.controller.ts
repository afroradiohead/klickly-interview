import {Controller, Post} from '@nestjs/common';

@Controller('api/migrate')
export class MigrateController {
    @Post()
    findAll() {
        return [];
    }
}