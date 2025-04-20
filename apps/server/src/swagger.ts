import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  Logger.debug('Initializing swagger with `swagger-access-token`');
  const config = new DocumentBuilder()
    .setTitle('Hwei API')
    .setVersion('1.0')
    .setDescription('API docs for hwei backend')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'swagger-access-token',
    )
    .addSecurityRequirements('swagger-access-token')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);
};
