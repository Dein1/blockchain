import sha256 from "crypto-js/sha256";

export default class Block {
  constructor(transactions, previousHash = "", timestamp = new Date()) {
    this.transactions = transactions;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.getHash();
  }

  getHash() {
    return sha256(
      `${this.timestamp}${JSON.stringify(this.transactions)}${
        this.previousHash
      }${this.nonce}`
    ).toString();
  }

  areTransactionsValid() {
    return this.transactions.every((trx) => trx.isValid(trx));
  }

  mine(difficulty) {
    const criteria = Array(difficulty).fill(0).join("");

    while (this.hash.substring(0, difficulty) !== criteria) {
      this.nonce += 1;
      this.hash = this.getHash();
    }

    console.log(`Successfuly mined! hash: ${this.hash}, nonce: ${this.nonce}`);
  }
}
