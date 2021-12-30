const express = require('express');
const app = express();

app.use('/javascript practice 3',express.static(__dirname +'/public'));

app.listen(8080, function(){
    console.log('listening on 8080')
});

app.get('/practice', function(req, res){
    res.send('js & jquery & node practice site')
});

app.get('/practice2', function(req, res){
    res.send('연습으로 하나정도 더 괜찮잖아?')
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
});