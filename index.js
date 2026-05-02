const express = require("express")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Minha API está funcionando")
})

app.get("/users", (req, res) => {
  res.json([
    { id: 1, nome: "x" },
    { id: 2, nome: "y" }
  ])
})

// rota POST
app.post("/users", (req, res) => {
  const novoUsuario = req.body

  res.json({
    mensagem: "Usuário recebido com sucesso",
    usuario: novoUsuario
  })
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})
