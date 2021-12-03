import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // somewhere in your initialization file
  app.use(helmet());
  // app.enableCors({
  //   origin: ['http://127.0.0.1:8081'],
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3003);
}
bootstrap();
