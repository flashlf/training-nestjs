import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as mustache from 'mustache-express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  const configService = app.get(ConfigService);
  app.use(cookieParser('COOKIE_PASS'));

  app.set('views', __dirname + '/../views');
  app.set('view engine', 'html');
  app.engine('html', mustache());
  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
