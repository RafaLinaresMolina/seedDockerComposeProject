import { SHA256 } from "crypto-js";
import { Block } from "./Block";

class ChainError extends Error {
  errors: BlockError[];
  constructor(message: string, errors: BlockError[]) {
    super(message);
    this.errors = errors;
    Object.setPrototypeOf(this, ChainError.prototype);
  }
  getErrorMessage() {
    return `${this.message} ${this.errors.map((error) => error.message)}`;
  }
}

class BlockError extends Error {
  value: string;
  constructor(message: string, value: string) {
    super(message);
    this.value = value;
    Object.setPrototypeOf(this, ChainError.prototype);
  }
  getErrorMessage() {
    return `${this.message} ${this.value}`;
  }
}

export class BlockChain {
  private chain: Block[];
  private index: number;
  // pendingTransactions: Block[];
  constructor() {
    this.chain = [];
    this.index = -1;
    // this.pendingTransactions = [];
    this.initializeChain();
  }

  async initializeChain() {
    if (this.index === -1) {
      const block = new Block({ data: "Genesis Block" });
      await this.addBlock(block);
    }
  }

  addBlock(block: Block) {
    const self = this;
    return new Promise(async (resolve, reject) => {
      block.index = self.chain.length;
      block.timestamp = Date.now();

      if (self.chain.length > 0) {
        block.previousHash = self.chain[block.index - 1].hash;
      }

      const errors = await self.validateChain();

      if (errors.length > 0) {
        reject(new ChainError("Some errors where found: ", errors));
      }

      block.hash = SHA256(JSON.stringify({ ...block, hash: null })).toString();
      self.chain.push(block);
      resolve(block);
    });
  }

  validateChain():Promise<BlockError[]>  {
    const self = this;
    const errors: BlockError[] = [];

    return new Promise(async (resolve, reject) => {
      self.chain.map(async (block) => {
        try {
          const isValid = block.isValid();
          if (!isValid) {
            errors.push(
              new BlockError(
                "This block is not valid: ",
                block.index.toString()
              )
            );
          }
        } catch (err) {
          errors.push(new BlockError("Something blew up: ", (err as Error).message));
        }
      });
      resolve(errors);
    });
  }

  print(){
      const self = this;
      self.chain.forEach(async (block) => {
          console.log(await block.toString());
      });
  }
}
