import { compare } from 'bcrypt'

export function pepperKey(key) {
    const chars: Array<string> = [];
    for (var i=33; i<123; i++) chars.push(String.fromCharCode(i));

    return key.substring(0, 10) + chars[Math.round(Math.random() * (90 - 0) + 0)].toString() + key.substring(10, key.length)
}