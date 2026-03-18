const swaggerJSDoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API",
      version: "1.0.0",
    },
  },
  apis: ["./app.js"],
}

module.exports = swaggerJSDoc(options)