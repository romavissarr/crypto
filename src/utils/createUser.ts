import json from "../database/json/data.json";
import ec from "./ec";
import {  userKeyExists, pepperKey, BlockChain } from ".";
import { genSalt, hash } from 'bcrypt'
import { writeFileSync } from "fs";
import { join } from "path";

export async function createUser() {
  let keyPair = ec.genKeyPair();
  let userKey = keyPair.getPrivate("hex");
  const myKey = ec.keyFromPrivate(
    userKey
  );
  let userId = myKey.getPublic("hex");

  let userKeyContinue = true;

  while (userKeyContinue) {
    if (userKeyExists(userKey)) {
      keyPair = ec.genKeyPair();
      userKey = keyPair.getPrivate("hex");
      userId = keyPair.getPublic('hex')
    } else userKeyContinue = false;
  }
  
  let baseKey = userKey

  userKey = pepperKey(userKey)
  
  const salt = await genSalt(10);
  userKey = await hash(userKey, salt)

  const userAux = json;

  const blockchain = new BlockChain();

  userAux.push({
      publicKey: userId,
      key: userKey,
      blockchain: blockchain.chain
  })
  writeFileSync(join(__dirname, "..", "database", "json", "data.json"), JSON.stringify(userAux))

  return {
    publicKey: userId,
    key: baseKey,
    blockchain: blockchain.chain
  }
}
