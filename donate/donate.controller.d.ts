import { DonateService } from './donate.service';
import { ActionGetResponse, ActionPostRequest, ActionPostResponse } from '@solana/actions';
export declare class DonateController {
    private readonly donateService;
    constructor(donateService: DonateService);
    getDonationInfo(): ActionGetResponse;
    getDonationInfoWithAmount(amount: string): {
        icon: string;
        label: string;
        title: string;
        description: string;
    };
    postDonation(amount: string, body: ActionPostRequest): Promise<ActionPostResponse>;
}
