import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import mustacheExpress from 'mustache-express';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser()); 
app.set('views', path.join(__dirname, 'public'));

// Carregar variáveis de ambiente
dotenv.config();

async function init() {
    try {
        const mysqli = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        // Rota para cadastro
        app.post('/cadastro', async (req, res) => {
            const { nome, email, senha } = req.body;
            try {
                const [results] = await mysqli.execute('INSERT INTO usuario(nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);
                console.log("Inserção feita com sucesso");
                res.redirect("/login.html");
            } catch (err) {
                console.log("Deu erro ao fazer a inserção", err);
                res.status(500).send("Erro ao inserir dados.");
            }
        });

     
        app.post('/login', async (req, res) => {
            const { email, senha } = req.body;
            try {
                const [rows] = await mysqli.execute('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha]);
                if (rows.length > 0) {
                    console.log("Login bem sucedido");
                    res.render('main.mustache', { email: email });
                } else {
                    console.log("A senha ou email está errado");
                    res.status(401).send("Email ou senha inválidos.");
                }
            } catch (err) {
                console.log("Deu erro ao fazer login", err);
                res.status(500).send("Erro ao fazer login.");
            }
        });

     
        app.listen(3000, () => {
            console.log("O servidor está rodando na porta 3000");
        });
        
    } catch (err) {
        console.log("Deu erro ao tentar conectar ao banco de dados", err);
    }
}

init();


app.listen(3000, () => {
    console.log("O servidor esta rodando na porta 3000");
});
console.log('Host:', 'roundhouse.proxy.rlwy.net');
console.log('User:', 'root');
console.log('Database:', 'railway');
console.log('Port:', 48116);
