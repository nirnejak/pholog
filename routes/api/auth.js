const express = require("express")
const chalk = require("chalk")
const jwt = require("jsonwebtoken")

const User = require("../../models/user")

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication Routes
 */


/**
 * @swagger
 * path:
 *  /auth/register:
 *    post:
 *      summary: Register a new user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post("/register", (req, res) => {
  const new_user = new User({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
    avatarUrl: req.body.avatarUrl,
  })
  new_user.save()
    .then(user => res.json({ message: "User registered successfully" }))
    .catch(error => res.status(500).json({ error: error.message }))
});

/**
 * @swagger
 * path:
 *  /auth/login:
 *    post:
 *      summary: Login a user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          jwt.sign({ user }, process.env.JWT_TOKEN_SECRET, { expiresIn: "1 day" }, (err, token) => {
            res.json({
              email: user.email,
              contact: user.contact,
              name: user.name,
              avatarUrl: user.avatarUrl,
              token
            })
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