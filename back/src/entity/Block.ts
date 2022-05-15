import { SHA256 } from "crypto-js";
import crypto from "crypto";

const algorithm = "aes-256-cbc"; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export type Payload = {
  data: string;
};

type EncryptedPayload = {
  iv: string;
  encryptedData: string;
};

class GenesisError extends Error {
  constructor() {
    super("you reached the Genesis Block!");
    Object.setPrototypeOf(this, GenesisError.prototype);
  }
  getErrorMessage() {
    return this.message;
  }
}

export class Block {
  hash: string;

  index: number;

  payload: EncryptedPayload;

  timestamp: number;

  previousHash: string;

  constructor(data: Payload) {
    this.hash = "";
    this.index = 0;
    this.payload = this.encryptPayload(data);
    this.timestamp = 0;
    this.previousHash = "";
  }

  encryptPayload(data: Payload) {
    const bufferedData = Buffer.from(JSON.stringify(data));
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(bufferedData);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const dataEncrypted = { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") }
    return dataEncrypted;
  }

  decryptPayload(encryptedPayload: EncryptedPayload) {
    let iv = Buffer.from(encryptedPayload.iv, "hex");
    let encryptedText = Buffer.from(encryptedPayload.encryptedData, "hex");
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  isValid() {
    const self = this;
    return new Promise((resolve, reject) => {
      let currentHash = self.hash;
      self.hash = SHA256(JSON.stringify({ ...self, hash: null })).toString();

      if (currentHash !== self.hash) {
        resolve(false);
      }
      resolve(true);
    });
  }

  getPayload() {
    const self = this;
    return new Promise(async (resolve, reject) => {
      try {
        const decodedPayload = this.decryptPayload(self.payload);
        const payloadObject = JSON.parse(decodedPayload);
        if (payloadObject === "Genesis Block") {
          reject(new GenesisError());
        }
        resolve(payloadObject);
      } catch (err) {
        reject(err);
      }
    });
  }

  async toString(): Promise<string> {
    const self = this;
    const blockString = `----------------- BLOCK ----------------- 
      Hash: ${self.hash}
      index: ${self.index}
      payload: ${JSON.stringify(await self.getPayload())}
      timestamp: ${self.timestamp}
      previousHash: ${self.previousHash}
----------------- END OF BLOCK -----------------
    `;
    return blockString;
  }
}
