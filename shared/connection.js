"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const web3_js_1 = require("@solana/web3.js");
exports.connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('mainnet-beta'));
//# sourceMappingURL=connection.js.map