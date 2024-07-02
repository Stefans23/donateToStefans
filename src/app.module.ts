import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonateModule } from './donate/donate.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DonateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
