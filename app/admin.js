const express = require("express");
const auth = require("./middleware/auth");
const router = express.Router();

router.get("/", auth, (req, res) => {
  res.send({ message: "It is a secret information", username: req.user.username });
});

module.exports = router;
