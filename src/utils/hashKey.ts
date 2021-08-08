import { hash, genSalt } from "bcrypt";
import { pepperKey } from ".";

export async function hashKey(key: string) {
    const salt = await genSalt(10)
    const hashedKey = await hash(pepperKey(key), salt);

    return hashedKey;
}
