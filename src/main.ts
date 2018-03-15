import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as exphbs from 'express-handlebars';
import * as path from 'path';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, 'views'));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();