import { Block, Transaction } from "./";
import ec from "./ec";

export class BlockChain {
  public chain: Array<Block>;
  public difficulty: number;
  public pendingTransactions: Array<Transaction>;
  public miningReward: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 50;
  }

  public createGenesisBlock(): Block {
    return new Block([], "0");
  }
  public calculatePreviousHash(): void {
    for (let i = 1; i < this.chain.length; i++) {
      this.chain[i].previousHash = this.chain[i - 1].hash;
    }
  }
  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }
  public minePendingTransactions(miningRewardAddress: string): void {
    const rewardTx: Transaction = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions.push(rewardTx);

    const block: Block = new Block(
      this.pendingTransactions,
      this.getLatestBlock().hash
    );
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined!");
    this.chain.push(block);

    this.pendingTransactions = [];
  }
  public addTransaction(transaction: Transaction): void {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("Transaction must include from and to address");
    }
    if (!transaction.isValid()) {
      throw new Error("Cannot add invalid transaction to chain");
    }
    if (transaction.amount <= 0) {
      throw new Error("Transaction amount should be higher than 0");
    }
    if (this.getAddressBalance(transaction.fromAddress) < transaction.amount) {
      throw new Error("Not enough balance");
    }

    this.pendingTransactions.push(transaction);
  }
  public getAddressBalance(address: string): number {
    let balance: number = 100;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) balance -= trans.amount;
        else if (trans.toAddress === address) balance += trans.amount;
      }
    }
    return balance;
  }
  public getAllTransactionsForWallet(address: string): Transaction[] {
    const txs = [];

    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAddress === address || tx.toAddress === address) {
          txs.push(tx);
        }
      }
    }
    return txs;
  }
  public isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }
      if (!currentBlock.hasValidTransaction()) {
        return false;
      }
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }

    return true;
  }
}
