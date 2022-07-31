import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
// modules
import { AppModule } from './app/app.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*' },
  });

  const RedisStore = connectRedis(session);
  const redisClient = new Redis();

  app.use(
    session({
      name: 'uid',
      store: new RedisStore({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        client: redisClient,
        // 30 minutes
        ttl: 30 * 60,
      }),
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: app.get('env') === 'production',
        httpOnly: true,
        sameSite: 'lax',
        // 30 minutes
        maxAge: 30 * 60 * 1000,
      },
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(4000);

  switch (app.get('env')) {
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
