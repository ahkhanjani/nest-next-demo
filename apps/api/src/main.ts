import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { useContainer } from 'class-validator';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';

import { AppModule } from './app/app.module';

async function bootstrap() {
  await ConfigModule.envVariablesLoaded;

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  console.log();
  app.enableCors({
    allowedHeaders: configService.get<string[]>('cors.app.headers'),
    origin: configService.get<string[]>('cors.app.origins'),
    credentials: true,
  });

  const RedisStore = connectRedis(session);
  const redisClient = new Redis();

  app.use(
    session({
      name: configService.get<string>('session.name'),
      store: new RedisStore({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        client: redisClient,
        ttl: configService.get<number>('session.ttl'),
      }),
      secret: configService.get<string>('session.secret'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure:
          configService.get<'development' | 'production'>('env') ===
          'production',
        httpOnly: true,
        sameSite: 'strict',
        // 30 minutes
        maxAge: configService.get<number>('session.ttl') * 1000,
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(configService.get<number>('port'));

  switch (configService.get<'development' | 'production'>('env')) {
    case 'development':
      console.log(
        `'api' is running on '${await app.getUrl()}'.\nGraphQL Playground: ${await app.getUrl()}/graphql`,
      );
      break;

    case 'production':
      console.log('The main API started.');
      break;

    default:
  }
}
bootstrap();
