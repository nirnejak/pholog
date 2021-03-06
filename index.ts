import express, { Request, Response } from "express"
import dotenv from "dotenv"
import chalk from "chalk"
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import Sentry from "@sentry/node"

import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options = require("./utils/swagger")

const { logger } = require("./middlewares/logger")

dotenv.config()

const app = express()
Sentry.init({ dsn: process.env.SENTRY_DSN })

// Middlewares
if (process.env.NODE_ENV === "production") {
  app.use(Sentry.Handlers.requestHandler())
}
app.use(cors())

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

const specs = swaggerJsdoc(options)
app.use("/", swaggerUi.serve)
app.get("/", swaggerUi.setup(specs, { explorer: true }))

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!")
})

// Using Routes for API
app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"))
app.use("/admin", require("./admin/"))

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({ error: true, message: "Not Found" })
})

if (process.env.NODE_ENV === "production")
  app.use(Sentry.Handlers.errorHandler())

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.green("🔥  MongoDB Connected...")))
  .catch((err) => console.log(chalk.red(err)))

app.listen(process.env.PORT, () => {
  console.log(chalk.green(`👍  Server started at PORT: ${process.env.PORT}`))
})

module.exports = app
