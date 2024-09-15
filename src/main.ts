import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './common/exceptions/prisma-client-exception.filter';
import { BadRequestExceptionFilter } from './common/exceptions/custom-bad-request-exception.filter';
import { NotFoundExceptionFilter } from './common/exceptions/custom-not-found-exception.filter';
import { InternalServerErrorExceptionFilter } from './common/exceptions/custom-internal-server-exception.filter';
import * as cookieParser from 'cookie-parser';
import { ForbiddenExceptionFilter } from './common/exceptions/custom-forbidden-excepion.filter';
import { UnauthorizedExceptionFilter } from './common/exceptions/custom-unauthorized-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { FileMiddleware } from './common/middleware/FileMiddleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useStaticAssets(join(__dirname, '..', 'public'), {
  //   prefix: '/public/',
  // });

  // app.use('/public/*', new FileMiddleware().use);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(),
    new BadRequestExceptionFilter(),
    new NotFoundExceptionFilter(),
    new InternalServerErrorExceptionFilter(),
    new ForbiddenExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API E-iM3')
    .setDescription('API Development Aplikasi E-iM3')
    .setVersion('1.0')
    .addServer('https://api-e-im3.vercel.app', 'Production Servel')
    .addServer('http://localhost:5090', 'Dev Server Port 5090')
    .addServer('http://localhost:3000', 'Dev Server Port 3000')
    .addServer('http://localhost:6948', 'Dev Server Port 6948')
    .build();

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'https://aplikasi-e-im3.vercel.app',
      'http://localhost:5090',
      'https://friendly-guide-9grrxx5pg7ghx6x7-5090.app.github.dev',
      'https://localhost:5090',
      'https://localhost:3000',
    ],
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { useGlobalPrefix: true });

  await app.listen(6948);
}
bootstrap();
