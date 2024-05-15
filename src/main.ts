import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

// TODO: сделать конфиг сервис

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(process.env);

  // TODO: /api - префикс, по дефолту /v1

  await app.listen(8000);
}

bootstrap();
