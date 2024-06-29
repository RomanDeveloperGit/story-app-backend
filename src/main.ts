import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from '@/shared/config';

import { AppModule } from './app.module';

// TODO: to think about a new architecture style. Maybe it will be DDD, onion or etc...
// Because even now we have a not low-coupling

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.enableCors();

  if (configService.get('hasDocs')) {
    const swaggerConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Story app backend API')
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, swaggerDocument);
  }

  await app.listen(8000);
}

bootstrap();
