const express = require('express')

const isAuthenticated = require("../../middlewares/auth")

const User = require('../../models/user')

const router = express.Router()

router.get('/', isAuthenticated, (req, res) => {
  User.findAll()
    .then(users => res.json({ users }))
    .catch(error => res.status(500).json({ message: error.message }))
})

router.get('/:email', isAuthenticated, (req, res) => {
  User.findOne({ email: req.params.email })
    .then(user => user ? res.status(404).json({ message: `No user found with email: ${res.params.email}` }) : res.json({ user }))
    .catch(error => res.status(500).json({ message: error.message }))
})

module.exports = router