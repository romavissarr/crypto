import { createHash } from "crypto";
import { BlockChain } from ".";
import { Transaction } from "./Transaction";

export class Block {
  public timestamp: number;
  public transactions: Transaction[];
  public previousHash: string;
  public hash: any;
  public nonce: number;

  constructor(transactions, previousHash = "") {
    this.timestamp = Date.now();
    this.previousHash = previousHash;
    this.transactions = transactions;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }
  public calculateHash(): string {
    return createHash("sha256")
      .update(
        this.previousHash +
          this.timestamp +
          JSON.stringify(this.transactions) +
          this.nonce
      )
      .digest("hex");
  }
  public mineBlock(difficulty: number): void {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Blocked mined: " + this.hash);
  }
  public hasValidTransaction(): boolean {
    for (const tx of this.transactions) {
      if (!tx.isValid()) return false;
    }
    return true;
  }
}
