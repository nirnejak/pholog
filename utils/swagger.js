// Swagger set up
module.exports = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Pholog",
      version: "1.0.0",
      description:
        "Document your Life",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
      contact: {
        name: "Pholog",
        url: "https://pholog.io",
        email: "hello@pholog.io"
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === "production" ? "https://phologapi.herokuapp.com/api/" : "http://localhost:3000/api/"
      }
    ]
  },
  apis: ["./models/user.js"]
};