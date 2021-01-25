const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');

const app = express();

//TEMPLATE ENGINE
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//routes and templates
app.get('/' , function (req, res) {
    //res.send('Mensagem de teste') MANDANDO UMA MSG SIMPLES
    //res.sendFile(__dirname+"/index.html"); MANDANDO UMA ARQUIVO ESPECIFICO
    res.render('index');
    /*console.log(req.params.id); PARAMETROS COM ID*/
});


//START SERVER

app.listen(3000, function (req, res) {
    console.log('Servidor Rodando!!!')
})
