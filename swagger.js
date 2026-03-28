const swaggerJSDoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API",
      version: "1.0.0",
    },
  },

  servers: [
      {
        url: "https://minha-api-usuarios-yu2h.onrender.com",
        description: "Servidor de Produção (Render)",
      },
    ],

  apis: ["./app.js"]
  };

module.exports = swaggerJSDoc(options)