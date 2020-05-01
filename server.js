var express = require('express');

var app = express();

app.use(express.static('.'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.listen('8080' , () => {console.log('Listening port 8080...')});