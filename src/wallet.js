import Elliptic from 'elliptic';

const ec = new Elliptic.ec('secp256k1');

export default class Wallet {}

export const createWallet = () => {
  const keyPair = ec.genKeyPair();

  const publicKey = keyPair.getPublic().encode('hex');
  const privateKey = keyPair.getPrivate();

  return { publicKey, privateKey, keyPair };
};

export const validateWallet = (privateKey, publicKey) => {
    const key = ec.keyFromPrivate(privateKey);

    const publicKeyFromPrivate = key.getPublic('hex');

    return publicKey === publicKeyFromPrivate;
};
