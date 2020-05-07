var express = require('express');
const db = require('./db/db');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('.'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/gradovi', (req, res) => db.gradovi.findAll().then(gradovi => res.json(gradovi)));
app.get('/gradovi/:id' , (req, res) =>  db.gradovi.findOne({
    where: {   id: req.params.id }}).then( data => { res.send(data) })   
);

app.delete('/gradovi/:id' , (req, res) => db.gradovi.destroy({
    where: { id: req.params.id }}).then( () => { res.json({ status : 'Deleted!'}) })  
);
app.post('/grad' , function(req, res)  {
    if ( !req.body)
        res.json({ error: 'Bad Data' })
    db.gradovi.create(req.body)
    .then( data => { res.send(data) }).catch( function (err) {res.sendStatus(500)});
});

app.put('/gradovi/:id' , function(req, res)  {
    if ( !req.body )
        res.json({ error: 'Bad Data' })
    var v = req.body;
    db.gradovi.update({
        naziv: v.naziv ,
        broj_stanovnika:v.broj_stanovnika,}, { where: { id: req.params.id } }
    ).then( () => { res.json({ status : 'Updated!'}) });
});

module.exports = app.listen('8080' , () => {console.log('Listening port 8080...')});