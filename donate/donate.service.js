"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonateService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const web3_js_1 = require("@solana/web3.js");
const transaction_utils_1 = require("../shared/transaction-utils");
let DonateService = class DonateService {
    constructor(configService) {
        this.configService = configService;
        this.title = "Donate to Stefans, Don't Blink!";
        this.description = "Hey friends! I'm diving into Web3 and need your help. Your donation isn't just for coffee—it keeps this Web3 beggar awake and working hard. I promise it'll be worth it!";
        this.donationAmounts = [0.01, 0.1, 1];
        this.defaultAmount = 0.1;
        this.icon = this.configService.get('ICON_URL');
        this.donationDestinationWallet = this.configService.get('DONATION_DESTINATION_WALLET');
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
    getDonateInfoWithAmount(amount) {
        return {
            icon: this.icon,
            label: `${amount} SOL`,
            title: this.title,
            description: this.description,
        };
    }
    async prepareDonateTransaction(account, amount) {
        const sender = new web3_js_1.PublicKey(account);
        const recipient = new web3_js_1.PublicKey(this.donationDestinationWallet);
        const lamports = amount * web3_js_1.LAMPORTS_PER_SOL;
        const instructions = [
            web3_js_1.SystemProgram.transfer({
                fromPubkey: sender,
                toPubkey: recipient,
                lamports,
            }),
        ];
        return (0, transaction_utils_1.prepareTransaction)(instructions, sender);
    }
};
exports.DonateService = DonateService;
exports.DonateService = DonateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DonateService);
//# sourceMappingURL=donate.service.js.map