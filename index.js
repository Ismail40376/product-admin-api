const express = require("express");
const app = express();
const port = 8000;
const products = require("./app/products");
const fileDb = require("./fileDb");
const cors = require("cors");

async function start() {
  app.use(cors());
  app.use(express.static("public"));
  await fileDb.init();
  app.use(express.json());
  app.use("/products", products);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
}

start();
