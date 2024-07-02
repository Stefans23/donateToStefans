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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonateController = void 0;
const common_1 = require("@nestjs/common");
const donate_service_1 = require("./donate.service");
const actions_1 = require("@solana/actions");
let DonateController = class DonateController {
    constructor(donateService) {
        this.donateService = donateService;
    }
    getDonationInfo() {
        actions_1.ACTIONS_CORS_HEADERS;
        return this.donateService.getDonateInfo();
    }
    getDonationInfoWithAmount(amount) {
        return this.donateService.getDonateInfoWithAmount(amount);
    }
    async postDonation(amount, body) {
        const parsedAmount = parseFloat(amount || this.donateService.defaultAmount.toString());
        const transaction = await this.donateService.prepareDonateTransaction(body.account, parsedAmount);
        return {
            transaction: Buffer.from(transaction.serialize()).toString('base64'),
        };
    }
};
exports.DonateController = DonateController;
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DonateController.prototype, "getDonationInfo", null);
__decorate([
    (0, common_1.Get)('/:amount'),
    (0, common_1.Header)('Access-Control-Allow-Origin', '*'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DonateController.prototype, "getDonationInfoWithAmount", null);
__decorate([
    (0, common_1.Post)('/:amount'),
    (0, common_1.Header)('Access-Control-Allow-Origin', '*'),
    __param(0, (0, common_1.Param)('amount')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DonateController.prototype, "postDonation", null);
exports.DonateController = DonateController = __decorate([
    (0, common_1.Controller)('api/donate'),
    __metadata("design:paramtypes", [donate_service_1.DonateService])
], DonateController);
//# sourceMappingURL=donate.controller.js.map