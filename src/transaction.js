import Elliptic from "elliptic";
import sha256 from "crypto-js/sha256";

const ec = new Elliptic.ec("secp256k1");

export default class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  getHash() {
    return sha256(
      `${this.fromAddress}${this.toAddress}${this.amount}`
    ).toString();
  }

  sign(signingKey) {
    if (this.fromAddress === null) {
      return true;
    }

    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("You can't sign a transaction for others wallet");
    }

    this.hash = this.getHash();

    const sign = signingKey.sign(this.hash, "base64");
    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");

    this.signature = sign.toDER("hex");

    console.log(`Signed! Signature: ${this.signature}`);
    return publicKey.verify(this.hash, this.signature);
  }

  isValid() {
    return true;
  }
}
