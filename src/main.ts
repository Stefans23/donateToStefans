// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ACTIONS_CORS_HEADERS } from '@solana/actions';
import cors from 'cors'; // 如果是本地调试的话, 要么用: import * as cors from 'cors'; 要么修改一下tsconfig.json

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cors());
  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,POST,PUT,DELETE,OPTIONS',
  //   allowedHeaders:
  //     'Content-Type, Authorization, Content-Encoding, Accept-Encoding',
  // });
  
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, Content-Encoding, Accept-Encoding',
  });

  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Encoding, Accept-Encoding');
      return res.sendStatus(200);
    }
    next();
  });

  await app.listen(4000);
}
bootstrap();
