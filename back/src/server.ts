import express from "express";
import "reflect-metadata";

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  console.log("HI!")
  res.send('Hello World!')
})

app.listen(PORT);