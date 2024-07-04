// donate.controller.ts
import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { DonateService } from './donate.service';
import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
} from '@solana/actions';

@Controller('api/donate')
export class DonateController {
  constructor(private readonly donateService: DonateService) {}

  @Get('/')
  // @Header('Access-Control-Allow-Origin', '*')
  // @Header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS')
  // @Header(
  //   'Access-Control-Allow-Headers',
  //   'Content-Type, Authorization, Content-Encoding, Accept-Encoding',
  // )
  // @Header('Content-Type', 'application/json')
  @HttpCode(200)
  getDonationInfo() {
    return this.donateService.getDonateInfo() as ActionGetResponse;
  }

  @Get('/:amount')
  // @Header('Access-Control-Allow-Origin', '*')
  // @Header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS')
  // @Header(
  //   'Access-Control-Allow-Headers',
  //   'Content-Type, Authorization, Content-Encoding, Accept-Encoding',
  // )
  // @Header('Content-Type', 'application/json')
  @HttpCode(200)
  getDonationInfoWithAmount(@Param('amount') amount: string) {
    return this.donateService.getDonateInfoWithAmount(amount);
  }

  @Post('/:amount')
  // @Header('Access-Control-Allow-Origin', '*')
  // @Header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS')
  // @Header(
  //   'Access-Control-Allow-Headers',
  //   'Content-Type, Authorization, Content-Encoding, Accept-Encoding',
  // )
  // @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async postDonation(
    @Param('amount') amount: string,
    @Body() body: ActionPostRequest,
  ): Promise<ActionPostResponse> {
    const parsedAmount = parseFloat(
      amount || this.donateService.defaultAmount.toString(),
    );
    try {
      const transaction = await this.donateService.prepareDonateTransaction(
        body.account,
        parsedAmount,
      );
      return {
        transaction: Buffer.from(transaction.serialize()).toString('base64'),
      };
    } catch (error) {
      console.error('Error preparing donation transaction:', error);
    }
  }
}
