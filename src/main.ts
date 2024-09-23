import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'src/common/exceptions/prisma-client-exception.filter';
import { BadRequestExceptionFilter } from 'src/common/exceptions/custom-bad-request-exception.filter';
import { NotFoundExceptionFilter } from 'src/common/exceptions/custom-not-found-exception.filter';
import { InternalServerErrorExceptionFilter } from 'src/common/exceptions/custom-internal-server-exception.filter';
import { ForbiddenExceptionFilter } from 'src/common/exceptions/custom-forbidden-excepion.filter';
import { UnauthorizedExceptionFilter } from 'src/common/exceptions/custom-unauthorized-exception.filter';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './common/config/setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter),
    new BadRequestExceptionFilter(),
    new NotFoundExceptionFilter(),
    new InternalServerErrorExceptionFilter(),
    new ForbiddenExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );

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

  setupSwagger(app)

  await app.listen(6948);
}
bootstrap();
