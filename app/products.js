const express = require("express");
const router = express.Router();
const fileDb = require("../fileDb.js");
const nanoid = require("nanoid");

const multer = require("multer");
const path = require("path");
const config = require("../config.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get("/", (req, res) => {
  const products = fileDb.getItems();
  res.send(products);
});

router.get("/:id", (req, res) => {
  const products = fileDb.getItems();
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).send({ error: "Product not found" });
  }
  res.send(product);
});

router.post("/", upload.single("image"), async (req, res) => {
  const id = nanoid();
  const product = { ...req.body, id };
  if (req.file) {
    product.image = req.file.filename;
  }
  await fileDb.addItem(product);
  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const success = await fileDb.deleteItem(req.params.id);
  if(!success) {
    return res.status(404).send({error:"Product not found"})
  }

  res.send({message:"Product delete succesfully"});
});

module.exports = router;
