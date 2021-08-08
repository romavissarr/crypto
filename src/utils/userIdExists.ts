import json from '../database/json/data.json'

export function userIdExists(id) {
    json.forEach((user) => {
        if(user.publicKey === id) return true;
    })
    return false;
}