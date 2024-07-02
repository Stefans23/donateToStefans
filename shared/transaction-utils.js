"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareTransaction = prepareTransaction;
const web3_js_1 = require("@solana/web3.js");
const connection_1 = require("./connection");
async function prepareTransaction(instructions, payer) {
    const blockhash = await connection_1.connection
        .getLatestBlockhash({ commitment: 'max' })
        .then((res) => res.blockhash);
    const messageV0 = new web3_js_1.TransactionMessage({
        payerKey: payer,
        recentBlockhash: blockhash,
        instructions
    }).compileToV0Message();
    return new web3_js_1.VersionedTransaction(messageV0);
}
//# sourceMappingURL=transaction-utils.js.map