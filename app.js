const db = require("./db")

const express = require("express")
const app = express()

const path = require('path'); // importar o módulo path
const jwt = require ('jsonwebtoken');

// express: entregar os arquivos da pasta atual
app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const cors = require('cors');
app.use(cors());


app.use (express.json())

/**
 * @openapi
 * /:
 *   get:
 *     summary: Verifica se a API está rodando
 *     responses:
 *       200:
 *         description: API está rodando normalmente.
 *       500:
 *         description: Erro no servidor.
 */

app.get("/", (req, res) => {
    res.send("API rodando!"),
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retorna a lista de usuários cadastrados
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       500:
 *         description: Erro no servidor
 */
app.get ("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            return res.status(500).json({erro: err.message})
        }
        res.json(results)
    })
})

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Inserção de usuário na database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - idade
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Fernanda
 *               idade:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       201:
 *         description: Usuário inserido com sucesso
 *       400:
 *         description: Dados obrigatórios ausentes
 *       500:
 *         description: Erro no servidor
 */

app.post ("/users", (req, res) => {
    const { nome, idade } = req.body 

       if (!nome || !idade) {
        return res.status(400).json({ erro: "nome e idade são dados obrigatórios para inserção do usuário"})
    }
    const sql = "INSERT INTO users (nome, idade) VALUES (?, ?)"
       
    db.query(sql, [nome, idade], (err, result) => {
        if (err) {
            console.error(err) 
            return res.status(500).json({erro: "Erro ao inserir usuário no banco"})
        }

        const token = jwt.sign({ userId: novoId}, processo.env.JWT_SECRET, { expiresIn: '24h' }) 
        
        res.status(201).json({
            mensagem: "Usuário inserido com sucesso!",
            id: novoId,
            token: token
        })
    })
    })
   
 app.delete ("/users/:id", (req, res) => {
    const idToDelete = req.params.id;
    const token = req.headers['authorization'];

    if (!token) return res.status(401).send("Acesso negado, token não foi fornecido");
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send("Token de verificação é inválido ou expirado. Não foi possível deletar registro do usuário.")});

        if (decoded.userId != idToDelete) return res.status(403).send("Você não tem permissão para deletar esse registro");

        db.query("DELETE FROM users WHERE id = ?", [idToDelete], (err, result) => {
            if (err) return res.status(500).send("Ocorreu um erro ao deletar o usuário da database.");
            res.send("Registro excluído!");
    });
})
    
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger")

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor está rodando na porta", PORT)
});