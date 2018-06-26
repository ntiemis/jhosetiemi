const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;

const app = express();

app.use(expressMongoDb('mongodb://jhosetiemi:jhosetiemi123@165.227.221.155/jhosetiemi'));
app.use(bodyParser.json());

app.use(cors());

app.get('/cadastros', (req, res) => {
    req.db.collection('usuarios').find().toArray((err, dados) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(dados);
    });
});


app.get('/usuario/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    req.db.collection('usuarios').findOne(query, (err, dados) => {
        if(err){
            res.status(500).send();
            return;
        }

        if(!data){
            res.status(404).send();
            return;
        }

        res.send(dados);
    });
});

app.post('/usuario', (req, res) => {
    let usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        nascimento: req.body.nascimento,
        cep: req.body.cep
    };

    // exemplo de validação de email
    // if(req.body.email.indexOf('@') == -1){
    //     res.status(400).send({mensagem: 'Email inválido'});
    //     return;
    // }

    req.db.collection('usuarios').insert(usuario, (err) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(req.body);
    });
});


app.put('/usuario/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    let usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        nascimento: req.body.nascimento,
        cep: req.body.cep
    };

    req.db.collection('usuarios').updateOne(query, usuario, (err, dados) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(dados);
    });
});


app.delete('/usuario/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    req.db.collection('usuarios').deleteOne(query, (err, dados) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(dados);
    });
});

app.listen(process.env.PORT || 3000, () => console.log('Aplicação iniciada'));