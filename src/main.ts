import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ACTIONS_CORS_HEADERS } from '@solana/actions';
import * as cors from 'cors';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.use(cors(ACTIONS_CORS_HEADERS));
  await app.init(); // 初始化应用程序，但不监听端口
}
bootstrap();

module.exports.handler = serverless(expressApp); // 导出 handler 函数供 Vercel 使用
