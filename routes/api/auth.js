const express = require("express")
const chalk = require("chalk")
const jwt = require("jsonwebtoken")

const User = require("../../models/user")

const router = express.Router();

router.post("/register", (req, res) => {
  const new_user = new User({
    name: req.body.name,
    password: req.body.name,
    email: req.body.email,
    avatarUrl: req.body.avatarUrl,
  })
  new_user.save(user => res.json({ message: "User registered successfully" }))
    .catch(error => res.status(500).json({ error: error.message }))
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          jwt.sign({ user }, process.env.JWT_TOKEN_SECRET, { expiresIn: "1 day" }, (err, token) => {
            user["jwtToken"] = token
            res.json({ ...user, token })
          })
        } else {
          res.status(401).json({ message: "Incorrect Password" })
        }
      } else {
        res.status(404).json({ message: "User not found" })
      }
    })
});

module.exports = router