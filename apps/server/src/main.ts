import { NestFactory } from '@nestjs/core';
import { Logger as NestLogger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

const PORT = process.env.PORT ?? 4000;
const ORIGIN = process.env.ORIGIN_URL?.trim()
  ? process.env.ORIGIN_URL.trim().split(/\s+/)
  : [];

NestLogger.debug(
  `Using env: ${JSON.stringify({ port: PORT, origin: ORIGIN }, null, 2)}`,
  'GLOBAL',
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: ORIGIN,
  });

  const config = new DocumentBuilder()
    .setTitle('Hwei Api Docs')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(PORT);
  NestLogger.log(`Application Port: ${PORT}`, '');
}

void (async (): Promise<void> => {
  try {
    await bootstrap();
    NestLogger.log('Server Started', 'Bootstrap');
  } catch (error) {
    NestLogger.error(error, 'Bootstrap');
  }
})();
