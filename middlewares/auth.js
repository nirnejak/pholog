const express = require('express')
const jwt = require('jsonwebtoken')
const chalk = require('chalk')

const config = require('../config')

module.exports = isAuthenticated = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]
    req["jwtToken"] = bearerToken

    jwt.verify(bearerToken, config.JWT_TOKEN_SECRET, (err, authData) => {
      if (err) {
        console.log(chalk.red.inverse(err))
        res.sendStatus(403) // Forbidden
      } else {
        express.request["user"] = authData.user
        req["user"] = authData.user
        next()
      }
    })
  } else {
    res.sendStatus(403) // Forbidden
  }
}