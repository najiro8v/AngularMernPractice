const express = require("express");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new UserModel({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(200).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

module.exports = router;
