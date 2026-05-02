const postg = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const dbConfig = connectionString ? {
  connectionString,
  ssl: { rejectUnauthorized: false }
} : {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
};

const db = new postg.Client(dbConfig);

// teste de conexao
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
    console.error("Variáveis de ambiente:");
    console.error("DATABASE_URL:", process.env.DATABASE_URL ? "definida" : "não definida");
    console.error("DB_HOST:", process.env.DB_HOST);
    console.error("DB_PORT:", process.env.DB_PORT);
    console.error("DB_USER:", process.env.DB_USER);
    console.error("DB_NAME:", process.env.DB_NAME);
  } else {
    console.log("Conectado ao Postgresql!");
  }
});

module.exports = db;