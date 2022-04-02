import Block from "./block";
import Transaction from "./transaction";

export default class Blockchain {
  constructor() {
    this.chain = [new Block([])];
    this.mempool = [];
    this.difficulty = 4;
    this.miningReward = 100;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(trx) {
    if (!trx.fromAddress || !trx.toAddress) {
      throw new Error("Transaction must have From and To addresses");
    }

    if (!trx.isValid()) {
      throw new Error("Transaction must be valid");
    }

    this.mempool.push(trx);
  }

  mineBlock(rewardAddress) {
    const latestBlock = this.getLatestBlock();
    const block = new Block(this.mempool, latestBlock.hash);

    block.mine(this.difficulty);
    this.chain.push(block);

    this.mempool = [new Transaction(null, rewardAddress, this.miningReward)];
  }

  getAddressBalance(address) {
    let balance = 0;

    for (let block of this.chain) {
      for (let trx of block.transactions) {
        if (trx.fromAddress === address) {
          balance -= trx.amount;
        }

        if (trx.toAddress === address) {
          balance += trx.amount;
        }
      }
    }

    return balance;
  }

  isValid() {
    return this.chain.every((block, index) => {
      if (!block.areTransactionsValid()) {
        console.log("Not all transactions in block are valid");
        return false;
      }

      if (block.hash !== block.getHash()) {
        console.log(`Hashes not equal in block: ${JSON.stringify(block)}`);
        return false;
      }

      const previousBlock = this.chain[index - 1];
      if (previousBlock && block.previousHash !== previousBlock.hash) {
        console.log(
          `Previous hashes not equal in block ${JSON.stringify(block)}`
        );
        return false;
      }

      return true;
    });
  }
}
