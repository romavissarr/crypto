import { compare } from "bcrypt";
import { UserModel } from "../database/models";
import json from "../database/json/data.json";

export async function validateKey(key, id) {
  const chars: Array<string> = [];
  for (var i = 33; i < 123; i++) chars.push(String.fromCharCode(i));

  chars.forEach(async (char) => {
    let PepperedKey =
      key.substring(0, 10) + char + key.substring(10, key.length);

    json.forEach((user) => {
      if (user.publicKey === id) {
        if (compare(PepperedKey, user.key)) return true;
      }
    });

    // const User = await UserModel.findOne({ id });
    // const hash = User.get("key");

    // console.log(hash);
    // console.log(PepperedKey);

    // if (compare(PepperedKey, hash)) {
    //   console.log("TRUE");
    //   // return true;
    // }
  });
  return false;
}
