import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ACTIONS_CORS_HEADERS } from '@solana/actions';
import cors from 'cors'; // 如果是本地调试的话, 要么用: import * as cors from 'cors'; 要么修改一下tsconfig.json

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(ACTIONS_CORS_HEADERS));
  await app.listen(4000);
}
bootstrap();
