const express = require("express");
const app = express();
const port = 8000;
const products = require("./app/products");
const fileDb = require("./fileDb");
const cors = require("cors");
const { connect, disconnect } = require("./mongoDb");

async function start() {
  await connect();
  app.use(cors());
  app.use(express.static("public"));
  app.use(express.json());
  app.use("/products", products);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on("SIGHN", async () => {
    console.log("SIGHN recieved - closing MongoDB connection");
    await disconnect();
    process.exit(0);
  });

  process.on("exit", () => {
    disconnect();
  });
}

start().catch(err => {
  console.error("Failed to start application:", err);
  process.exit(1);
});
