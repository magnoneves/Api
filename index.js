import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser()); 

app.post('/cadastro',  (req, res) => {
    console.log("deu certo");
})