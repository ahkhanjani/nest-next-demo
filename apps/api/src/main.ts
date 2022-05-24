import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
// modules
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: process.env.CORS_ORIGIN },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(4000);

  console.log(
    `fm-server is running on ${await app.getUrl()}\ngql playground: ${await app.getUrl()}/graphql`,
  );
}
bootstrap();
