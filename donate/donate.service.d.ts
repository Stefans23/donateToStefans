import { ConfigService } from '@nestjs/config';
export declare class DonateService {
    private configService;
    private readonly icon;
    private readonly donationDestinationWallet;
    private readonly title;
    private readonly description;
    private readonly donationAmounts;
    readonly defaultAmount = 0.1;
    constructor(configService: ConfigService);
    getDonateInfo(): {
        icon: string;
        label: string;
        title: string;
        description: string;
        links: {
            actions: ({
                label: string;
                href: string;
            } | {
                href: string;
                label: string;
                parameters: {
                    name: string;
                    label: string;
                }[];
            })[];
        };
    };
    getDonateInfoWithAmount(amount: string): {
        icon: string;
        label: string;
        title: string;
        description: string;
    };
    prepareDonateTransaction(account: string, amount: number): Promise<import("@solana/web3.js").VersionedTransaction>;
}
