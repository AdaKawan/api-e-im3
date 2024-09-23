import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

const SWAGGER_PATH = 'api'

export const setupSwagger = (app: INestApplication) => {
    const swaggerPassword = app.get(ConfigService).get('swaggerPassword');
    const swaggerUser = app.get(ConfigService).get('swaggerUser');

    if (process.env.NODE_ENV === 'production') {
        app.use(
            [`/${SWAGGER_PATH}`, `/${SWAGGER_PATH}-json`, `/${SWAGGER_PATH}-yaml`],
            basicAuth({
                challenge: true,
                users: {
                    [swaggerUser]: swaggerPassword,
                },
            }),
        );
    }

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('API E-iM3')
        .setDescription('API Development Aplikasi E-iM3')
        .setVersion('0.1.9-demo')
        .addServer('https://rehan.niznet.my.id', 'Production Server')
        .addServer('http://localhost:6948', 'Dev Server Port 6948')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, { useGlobalPrefix: true });
}