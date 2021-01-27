const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const urlencodeParser = bodyParser.urlencoded({extended:false});
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3307
});

sql.query('use nodejs');



const app = express();

//TEMPLATE ENGINE
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/css', express.static('css'));//PARA OS ARQUIVOS CSS
app.use('/js', express.static('js'));// PARA OS ARQUIVOS js
app.use('/img', express.static('img')); //PARA AS IMAGEM ESTÁTICAS


//routes and templates
app.get('/' , function (req, res) {
    //res.send('Mensagem de teste') MANDANDO UMA MSG SIMPLES
    //res.sendFile(__dirname+"/index.html"); MANDANDO UMA ARQUIVO ESPECIFICO
    res.render('index');
    /*console.log(req.params.id); PARAMETROS COM ID*/
});

app.get('/inserir', function(req, res) {
    res.render('inserir');
});

app.get('/select/:id?', function(req, res) {
    if(!req.params.id) {        
        sql.query("select * from user order by id asc", function(err, result, fields) {
            res.render('select',{data:result});
        });
    }else{
        sql.query("select * from user where id=? order by id asc",[req.params.id], function(err, result, fields) {
            res.render('select',{data:result});
        });
    }

    
});

app.post('/controlerForm', urlencodeParser, function(req, res) {
    sql.query('insert into user values (?,?,?)', [req.body.id,req.body.name, req.body.age]);
    res.render('controlerForm',{name:req.body.name});
});


//START SERVER

app.listen(3000, function (req, res) {
    console.log('Servidor Rodando!!!')
});