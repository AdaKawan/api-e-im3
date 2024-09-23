import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaClientExceptionFilter } from 'src/common/exceptions/prisma-client-exception.filter';
import { UnauthorizedExceptionFilter } from 'src/common/exceptions/custom-unauthorized-exception.filter';
import { BadRequestExceptionFilter } from 'src/common/exceptions/custom-bad-request-exception.filter';
import { ForbiddenExceptionFilter } from 'src/common/exceptions/custom-forbidden-excepion.filter';
import { InternalServerErrorExceptionFilter } from 'src/common/exceptions/custom-internal-server-exception.filter';
import { NotFoundExceptionFilter } from 'src/common/exceptions/custom-not-found-exception.filter';

let app: INestApplication;

export const getAppInstance = async (): Promise<INestApplication> => {
    if (!app) {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        app.useGlobalFilters(
            new PrismaClientExceptionFilter(app.getHttpAdapter()),
            new BadRequestExceptionFilter(),
            new NotFoundExceptionFilter(),
            new InternalServerErrorExceptionFilter(),
            new ForbiddenExceptionFilter(),
            new UnauthorizedExceptionFilter(),
        );
        await app.init();
    }
    return app;
};

export const closeAppInstance = async () => {
    if (app) {
        await app.close();
    }
};
