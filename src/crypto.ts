import { Block, BlockChain, Transaction } from "./utils";
import ec from "./utils/ec";

const myKey = ec.keyFromPrivate(
  "019890250546a07746691db358fa5de7ad5298212b6112d3477325fe20b0705c"
);
const myWalletAddress = myKey.getPublic("hex");

const coin = new BlockChain();


console.log(JSON.stringify(coin, null, 4))

const tx1 = new Transaction(myWalletAddress, "public", 10);
tx1.signTransaction(myKey);
coin.addTransaction(tx1);

console.log("\nStarting the miner...");

coin.minePendingTransactions(myWalletAddress);

console.log("\nRom's balance is", coin.getAddressBalance(myWalletAddress));

// coin.calculatePreviousHash();

console.log(JSON.stringify(coin, null, 4))

console.log(coin.isChainValid());