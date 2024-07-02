import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ACTIONS_CORS_HEADERS } from '@solana/actions';
import cors from 'cors';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverless from 'serverless-http';

const expressApp = express();

async function bootstrap() {
  console.log('Starting Nest application...');
  try {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    app.use(cors(ACTIONS_CORS_HEADERS));
    await app.init(); // 初始化应用程序，但不监听端口
    console.log('Nest application initialized');
  } catch (error) {
    console.error('Error during Nest application initialization:', error);
  }
}
bootstrap();

module.exports.handler = serverless(expressApp); // 导出 handler 函数供 Vercel 使用
