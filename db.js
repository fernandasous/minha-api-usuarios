const postg = require("pg");
require("dotenv").config();

const db = new postg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// teste de conexao
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
  } else {
    console.log("Conectado ao Postgresql!");
  }
});

module.exports = db;