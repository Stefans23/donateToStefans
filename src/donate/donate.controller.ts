import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { DonateService } from './donate.service';
import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
} from '@solana/actions';

@Controller('api/donate')
export class DonateController {
  constructor(private readonly donateService: DonateService) {}

  @Get('/')
  @HttpCode(200)
  getDonationInfo() {
    ACTIONS_CORS_HEADERS;
    return this.donateService.getDonateInfo() as ActionGetResponse;
  }

  @Get('/:amount')
  @HttpCode(200)
  getDonationInfoWithAmount(@Param('amount') amount: string) {
    return this.donateService.getDonateInfoWithAmount(amount);
  }

  @Post('/:amount')
  @HttpCode(200)
  async postDonation(
    @Param('amount') amount: string,
    @Body() body: ActionPostRequest,
  ): Promise<ActionPostResponse> {
    const parsedAmount = parseFloat(
      amount || this.donateService.defaultAmount.toString(),
    );
    const transaction = await this.donateService.prepareDonateTransaction(
      body.account,
      parsedAmount,
    );
    return {
      transaction: Buffer.from(transaction.serialize()).toString('base64'),
    };
  }
}
