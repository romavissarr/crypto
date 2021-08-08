import { Block, BlockChain, Transaction, validateKey } from "./utils";
import { UserModel } from "./database/models";
import ec from "./utils/ec";

const romKey = ec.keyFromPrivate(
  "931ded9e98642fd4d783557a1ec2978f1fab35cbaaea232ca9304a3fa420659d"
);
const romWalletAddress = romKey.getPublic("hex");

// const coin = new BlockChain();

// console.log(JSON.stringify(coin, null, 4))

// const tx1 = new Transaction(myWalletAddress, "public", 10);
// tx1.signTransaction(myKey);
// coin.addTransaction(tx1);

// console.log("\nStarting the miner...");

// coin.minePendingTransactions(myWalletAddress);

// console.log("\nRom's balance is", coin.getAddressBalance(myWalletAddress));

// console.log(JSON.stringify(coin, null, 4))


import flake from 'simpleflake';
const id = flake().toString('base10')

// 5717630524963050962

import { genSalt, hash, compare } from 'bcrypt'
import { hashKey, pepperKey } from "./utils";
import { createUser } from "./utils/createUser";

// const key = hashKey("019890250546a07746691db358fa5de7ad5298212b6112d3477325fe20b0705c");
// console.log(key)

// async function main() {
//     const salt = await genSalt(10)
//     console.log(pepperKey("\n\n019890250546a07746691db358fa5de7ad5298212b6112d3477325fe20b0705c"))
//     const hashedKey = await hash(pepperKey("019890250546a07746691db358fa5de7ad5298212b6112d3477325fe20b0705c"), salt);
    
//     const newKey = hashedKey;

//     console.log(newKey)
// }

// main();

// validateKey("019890250546a07746691db358fa5de7ad5298212b6112d3477325fe20b0705c", "5717630524963050962")
// createUser()
import json from './database/json/data.json'
json.forEach((user) => {
  console.log(user)
})

const bc = new BlockChain();
json.forEach((user) => {
  if((user.publicKey) === romWalletAddress) bc.chain = user.blockchain.values;
})

// const userData = createUser();

// console.log()
// userData.then((data) => console.log(`User created: {\n  id: "${data.publicKey}",`))
// userData.then((data) => console.log(`  key: "${data.key}",\n}`))
