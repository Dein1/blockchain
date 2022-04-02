import Blockchain from './src/blockchain';
import Transaction from './src/transaction';
import { createWallet } from './src/wallet';

const blockchain = new Blockchain();

const myWallet = createWallet();
const othersWallet = createWallet();

const trx1 = new Transaction(myWallet.publicKey, othersWallet.publicKey, 25);
trx1.sign(myWallet.keyPair);
blockchain.addTransaction(trx1);

console.log('Mining started');
blockchain.mineBlock(myWallet.publicKey);

const trx2 = new Transaction(myWallet.publicKey, othersWallet.publicKey, 35);
trx2.sign(myWallet.keyPair);
blockchain.addTransaction(trx2);

const trx3 = new Transaction(othersWallet.publicKey, myWallet.publicKey, 1);
trx3.sign(othersWallet.keyPair);
blockchain.addTransaction(trx3);

console.log('Mining started');
blockchain.mineBlock(myWallet.publicKey);

console.log(`My balance: ${blockchain.getAddressBalance(myWallet.publicKey)}`)
console.log(`Others balance: ${blockchain.getAddressBalance(othersWallet.publicKey)}`)

console.log(`Is blockchain valid? ${blockchain.isValid()}`)

blockchain.chain[1].transactions[0].amount = 200;

console.log(`Is blockchain still valid after manual changes? ${blockchain.isValid()}`)