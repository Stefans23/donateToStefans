import { PublicKey, TransactionInstruction, VersionedTransaction } from '@solana/web3.js';
export declare function prepareTransaction(instructions: TransactionInstruction[], payer: PublicKey): Promise<VersionedTransaction>;
