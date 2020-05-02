const moment = require("moment")
const chalk = require("chalk")

exports.logger = (req, res, next) => {
  console.log(`${chalk.white.bold.inverse(` ${req.method} `)} ${req.protocol}://${req.get("host")}${req.originalUrl} : ${moment().format()}`)
  next()
}