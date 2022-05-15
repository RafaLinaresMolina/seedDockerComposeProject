import express from "express";
import "reflect-metadata";

import { Block } from "./entity/Block";
import { BlockChain } from "./entity/BlockChain";

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT);

const runChain = async() => {
  const blockChain = await new BlockChain();
  for(let i = 0; i<4; i++){
    await blockChain.addBlock(new Block({data: `This is the block #${i+1}`}))
  }

  blockChain.print();
}

runChain();