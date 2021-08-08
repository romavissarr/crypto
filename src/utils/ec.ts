import elliptic from 'elliptic'
const ecInitializer = elliptic.ec;
const ec = new ecInitializer('secp256k1')

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

// console.log()
// console.log('Private key:', privateKey)

// console.log()
// console.log('Public key:', publicKey)

export default ec;