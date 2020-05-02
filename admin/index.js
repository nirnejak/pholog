const AdminBro = require("admin-bro")
const AdminBroExpress = require("admin-bro-expressjs")
const AdminBroMongoose = require("admin-bro-mongoose")
const chalk = require("chalk")

const User = require("../models/user")

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: { isVisible: { list: false, filter: false, show: true, edit: false } },
          token: { isVisible: { list: false, filter: false, show: true, edit: false } }
        }
      }
    }
  ],
  branding: {
    companyName: "Pholog",
    softwareBrothers: false,
    // logo: "URL_TO_LOGO"
  },
  rootPath: "/admin"
})

// module.exports = adminRouter = AdminBroExpress.buildRouter(adminBro)
module.exports = adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    try {
      const user = await User.findOne({ email: email })
      if (user.password === password) return user
      else return null
    } catch (err) {
      console.log(chalk.red(err))
    }
  },
  cookieName: process.env.COOKIE_NAME,
  cookiePassword: process.env.COOKIE_PASSWORD
})