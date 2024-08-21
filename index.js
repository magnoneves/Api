import express from "express";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser()); 

app.post('/cadastro',  (req, res) => {
    console.log("deu certo");
});

app.listen(3000, () => {
    console.log("concetou com sucesso");
})