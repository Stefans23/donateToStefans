import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ACTIONS_CORS_HEADERS } from '@solana/actions';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(ACTIONS_CORS_HEADERS));
  await app.listen(4000);
}
bootstrap();
