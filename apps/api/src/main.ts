import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
// modules
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*' },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(4000);

  switch (process.env.NODE_ENV) {
    case 'development':
    case 'dev':
      console.log(
        `'api' is running on '${await app.getUrl()}'.\nGraphQL Playground: ${await app.getUrl()}/graphql`
      );
      break;

    case 'production':
    case 'prod':
      console.log('The main API started.');
      break;

    default:
  }
}
bootstrap();
