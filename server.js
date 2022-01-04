const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');


let db;
MongoClient.connect('mongodb+srv://CS526350:dltmdals1234@cluster0.yaogt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(err, client){

    if(err){return console.log(에러)};

    db = client.db('practice');

    db.collection('post').insertOne({이름 : '승민', 나이 : 20, _id : 10}, function(erro, resu){
        console.log('저장완료');
    });


    app.listen(8080, function(){
        console.log('listening on 8080')
    });
})
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({extended : true}));
app.use(express.urlencoded({extended: true}));


app.use(express.static(__dirname));



app.get('/practice', function(req, res){
    res.send('js & jquery & node practice site')
});

app.get('/practice2', function(req, res){
    res.send('연습으로 하나정도 더 괜찮잖아?')
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
});


app.get('/write', function(req,res){
    res.sendFile(__dirname + '/write.html')
});


app.post('/add', function(req, res){
    res.send('전송완료')
    console.log(req.body)
    db.collection('counter').findOne({name : "게시물갯수"}, function(err,resu){
        console.log(resu.totalPost)
    });
    // db.collection('post').insertOne({_id : +1, 제목 : req.body.title, 날짜 : req.body.date}, function(err,res){
    //     console.log('저장완료!')
    // })
});



app.get('/list', function(req,res){

    db.collection('post').find().toArray(function(err,resu){
        console.log(resu);
        res.render('list.ejs', {posts : resu});
    });

    
})