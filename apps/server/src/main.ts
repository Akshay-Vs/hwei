import { NestFactory } from '@nestjs/core';
import { Logger as NestLogger } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { setupSwagger } from './swagger';

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

  setupSwagger(app);

  await app.listen(PORT);
  NestLogger.log(`Application Port: ${PORT}`, '');
}

void (async (): Promise<void> => {
  const logger = new NestLogger('Bootstrap');

  try {
    await bootstrap();
    logger.log('Server Started');
  } catch (error) {
    logger.error(error);
  }
})();
