import json from '../database/json/data.json'
import { compare } from 'bcrypt'

export function userKeyExists(key) {
    const chars: Array<string> = [];
  for (var i = 33; i < 123; i++) chars.push(String.fromCharCode(i));

  chars.forEach(async (char) => {
    let PepperedKey =
      key.substring(0, 10) + char + key.substring(10, key.length);

    json.forEach((user) => {
        if(compare(PepperedKey, user.key)) return true;
    });
  })
  return false;
}