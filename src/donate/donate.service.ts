import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
import { prepareTransaction } from 'src/shared/transaction-utils';

@Injectable()
export class DonateService {
  private readonly icon: string;
  private readonly donationDestinationWallet: string;
  private readonly title = "Donate to Stefans, Don't Blink!";
  private readonly description =
    "Hey friends! I'm diving into Web3 and need your help. Your donation isn't just for coffee—it keeps this Web3 beggar awake and working hard. I promise it'll be worth it!";
  private readonly donationAmounts = [0.01, 0.1, 1];
  public readonly defaultAmount = 0.1;

  constructor(private configService: ConfigService) {
    this.icon = this.configService.get<string>('ICON_URL');
    this.donationDestinationWallet = this.configService.get<string>(
      'DONATION_DESTINATION_WALLET',
    );
  }

  getDonateInfo() {
    return {
      icon: this.icon,
      label: `${this.defaultAmount} SOL`,
      title: this.title,
      description: this.description,
      links: {
        actions: [
          ...this.donationAmounts.map((amount) => ({
            label: `${amount} SOL`,
            href: `/api/donate/${amount}`,
          })),
          {
            href: `/api/donate/{amount}`,
            label: 'Donate',
            parameters: [
              {
                name: 'amount',
                label: 'Enter a custom SOL amount',
              },
            ],
          },
        ],
      },
    };
  }

  getDonateInfoWithAmount(amount: string) {
    return {
      icon: this.icon,
      label: `${amount} SOL`,
      title: this.title,
      description: this.description,
    };
  }

  async prepareDonateTransaction(account: string, amount: number) {
    const sender = new PublicKey(account);
    const recipient = new PublicKey(this.donationDestinationWallet);
    const lamports = amount * LAMPORTS_PER_SOL;

    const instructions = [
      SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: recipient,
        lamports,
      }),
    ];
    return prepareTransaction(instructions, sender);
  }
}
