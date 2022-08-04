import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { SessionEntity } from './typeorm';
import { ConfigService } from '@nestjs/config';
import { EnviormentKeys } from './constants/EnviormentKeys';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

const bootstrap = async () => {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const dataSource = app.get(DataSource);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = configService.get<number>(EnviormentKeys.PORT);
  const sessionSecret = configService.get(EnviormentKeys.SESSION_SECRET);
  const sessionMaxAge = +configService.get(EnviormentKeys.SESSION_MAXAGE);
  const sessionRepository = dataSource.getRepository(SessionEntity);
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'NESTJS_SESSION',
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: sessionMaxAge,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const config = new DocumentBuilder()
    .setTitle('TK 1919')
    .setDescription('TK 1919 API')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
};

bootstrap();
