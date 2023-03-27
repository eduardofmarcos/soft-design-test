import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppplicationModule } from './application.module';

async function bootstrap() {
  const app = await NestFactory.create(AppplicationModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
