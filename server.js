require('dotenv').config();


const express = require('express');
const app = express();

const http = require('http').createServer(app);
const {Server} = require('socket.io');
const io = new Server(http);
const MongoClient = require('mongodb').MongoClient;

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const {ObjectId} = require('mongodb');
98
app.use(session({secret : '비밀코드', resave : true, saveUninitialized : false}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

let db;
MongoClient.connect(process.env.DB_URL , function(err, client){

    if(err){return console.log(에러)};

    db = client.db('practice');

    // db.collection('post').insertOne({이름 : '승민', 나이 : 20, _id : 1}, function(erro, resu){
    //     console.log('저장완료');
    // });


    http.listen(8080, function(){
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






app.get('/list', function(req,res){

    db.collection('post').find().toArray(function(err,resu){
        console.log(resu);
        res.render('list.ejs', {posts : resu});
    });

    
});



app.get('/search', (req,res) => {

    let searchCondition =[
        {
            $search: {
                index : 'titleSearch',
                text : {
                    query: req.query.value,
                    path: '제목'
                }
            }
        }
    ]

    console.log(req.query.value);
    db.collection('post').aggregate(searchCondition).toArray((err,resu) => {
        console.log(resu);
        res.render('search.ejs', {posts : resu})
    })
})





app.get('/detail/:id', function(req,res){

    db.collection('post').findOne({_id : parseInt(req.params.id) }, function(err,resu){
        console.log(resu);
        res.render('detail.ejs', { data : resu})
    })
})

app.get('/edit/:id', function(req,res){

    db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err,resu){
        console.log(resu);
        res.render('edit.ejs', {post : resu})
    })

    
})

app.put('/edit', function(req,res){

    db.collection('post').updateOne({ _id : parseInt(req.body.id) },{ $set : {제목 : req.body.title , 날짜 : req.body.date}},function(err,resu){
        console.log('수정완료');
        res.redirect('/list')
    })
})

app.get('/login', function(req,res){
    res.render('login.ejs')
});

app.post('/login',passport.authenticate('local', {
    failureRedirect : '/fail'
}), function(req,res){
    res.redirect('/mypage')
});

app.get('/mypage', whatLogin, function(req,res){
    console.log(req.user);
    res.render('mypage.ejs', {사용자 : req.user})
})

function whatLogin(req,res,next){
    if(req.user){
        next()
    } else {
        res.send('로그인안하셨는데요? 왜 안하심? 사람 맞음???')
    }
}



passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, function (입력한아이디, 입력한비번, done) {
    console.log(입력한아이디, 입력한비번);
    db.collection('login').findOne({ id: 입력한아이디 }, function (err, resu) {
      if (err) return done(err)
  
      if (!resu) return done(null, false, { message: '존재하지않는 아이디요' })
      if (입력한비번 == resu.pw) {
        return done(null, resu)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    })
  }));

  passport.serializeUser(function(user, done){
    done(null, user.id)
  });

  passport.deserializeUser(function(아이디, done){
      db.collection('login').findOne({id : 아이디}, function(err,resu){
        done(null, resu)
      })
  })




  app.post('/register', function(req,res){
    db.collection('login').insertOne({ id : req.body.id, pw : req.body.pw}, function(err,resu){
        res.redirect('/')
    })
  })



  app.post('/add', function(req, res){

    

    res.send('전송완료');
    console.log(req.body);
    db.collection('counter').findOne({name : '게시물갯수'}, function(err,resu){
        console.log(resu.totalPost);

        let totalNum = resu.totalPost;
        let savePoint = {_id : (totalNum +1), 작성자: req.user._id, 제목 : req.body.title, 날짜 : req.body.date };

        db.collection('post').insertOne( savePoint, function(err,resu){
            db.collection('counter').updateOne({name : '게시물갯수'}, { $inc : {totalPost : 1}}, function(err, resu){
                if(err){return console.log(err)}
            })
        })
    })
});


app.delete('/delete', function(req,res){
    console.log(req.body);
    req.body._id = parseInt(req.body._id);

    let removeData = {_id : req.body._id, 작성자 : req.user._id}



    db.collection('post').deleteOne(removeData, function(err,resu){
        console.log('삭제완료');
        if(resu){console.log(resu)}
        res.status(200).send({ message : '성공했습니다'});
    })
})


app.use('/shop', require('./routes/shop.js'))

// app.get('/shop/shirts', function(req,res){
//     res.send('셔츠 파는 페이지입니다.');
// });

// app.get('/shop/pants', function(req,res){
//     res.send('바지 파는 페이지입니다.')
// });

app.use('/board/sub', require('./routes/board.js'))


let multer = require('multer');
let storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './public/image')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
});

let path = require('path');

let upload = multer({
    storage : storage,
    fileFilter : function(req, file, callback){
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg'){
            return callback(new Error('PNG, JPG/JPEG만 업로드하세요'))
        }
        callback(null, true);
    },
    limits:{
        fileSize: 1024 * 1024
    }
});

app.get('/upload', function(req,res){
    res.render('upload.ejs')
});

app.post('/upload', upload.single('profile') ,function(req,res){
    res.send('업로드완료')
});

app.get('/image/:imageName', function(req,res){
    res.sendFile(__dirname + '/public/image/' + req.params.imageName)
})




app.post('/chatroom', whatLogin ,function(req,res){

    let savePoint = {
        title : '무슨무슨채팅방',
        member : [ObjectId(req.body.attackId) , req.user._id],
        date : new Date()
    }



    db.collection('chatroom').insertOne(savePoint).then((resu)=>{
        res.send('성공')
    })
})

app.get('/chat', function(req,res){

    db.collection('chatroom').find({member : req.user._id}).toArray().then((resu)=>{
        res.render('chatroom.ejs', {data : resu})
    })

   
})

app.post('/message', whatLogin, function(req,res){


    let msgPoint = {
        parent :  req.body.parent,
        content :  req.body.content,
        userid :  req.user.id,
        date : new Date(),
    }


    db.collection('message').insertOne(msgPoint).then(()=>{
        console.log('db저장성공')
        res.send('db저장성공!!')
    })

})

app.get('/message/:id', whatLogin, function(req,res){

    res.writeHead(200, {

        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",

    });
    
    db.collection('message').find({ parent : req.params.id}).toArray()
    .then((resu)=>{
        res.write('event: test\n');
    res.write('data:' + JSON.stringify(resu) + '\n\n');
    })

    const pipeline = [
        {$match: { 'fullDocument.parent' : req.params.id }}
    ];

    const collection = db.collection('message');
    const changeStream = collection.watch(pipeline);
    changeStream.on('change',(result)=>{
        res.write('event: test\n');
        res.write('data:' + JSON.stringify([result.fullDocument]) + '\n\n');
    });


    

});

app.get('/socket', function(req,res){
    res.render('socket.ejs');
})

io.on('connection', function(socket){
    console.log('유저접속됨');

    socket.on('room1-send', function(data){
        io.to('room1').emit('broadcast', data)
    });


    
    socket.on('joinroom', function(data){
        socket.join('room1');
    });

    socket.on('user-send', function(data){
        io.emit('broadcast', data)
    });
    
})