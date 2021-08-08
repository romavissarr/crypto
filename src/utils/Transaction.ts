import { createHash } from "crypto";
import ec from "./ec";

export class Transaction {
  public fromAddress: string;
  public toAddress: string;
  public amount: number;
  public signature: any;
  public timestamp: number;

  constructor(fromAddress: string, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.timestamp = Date.now();
  }

  public calculateHash(): string {
    return createHash("sha256")
      .update(this.fromAddress + this.toAddress + this.amount + this.timestamp)
      .digest("hex");
  }
  public signTransaction(signingKey: any): void {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("You cannot sign transactions for other wallets!");
    }
    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, "base64");

    this.signature = sig.toDER("hex");
  }
  public isValid(): boolean {
    if (this.fromAddress === null) return true;
    else if (!this.signature || this.signature.length === 0)
      throw new Error("No signature in this transaction!");

    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}
