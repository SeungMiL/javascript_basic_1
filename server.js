require('dotenv').config();


const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
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
    res.send('전송완료');
    console.log(req.body);
    db.collection('counter').findOne({name : '게시물갯수'}, function(err,resu){
        console.log(resu.totalPost);

        let totalNum = resu.totalPost;

        db.collection('post').insertOne({_id : (totalNum +1), 제목 : req.body.title, 날짜 : req.body.date}, function(err,resu){
            db.collection('counter').updateOne({name : '게시물갯수'}, { $inc : {totalPost : 1}}, function(err, resu){
                if(err){return console.log(err)}
            })
        })
    })
});



app.get('/list', function(req,res){

    db.collection('post').find().toArray(function(err,resu){
        console.log(resu);
        res.render('list.ejs', {posts : resu});
    });

    
});



app.get('/search', (req,res) => {
    console.log(req.query.value);
    db.collection('post').find({제목 : req.query.value}).toArray((err,resu) => {
        console.log(resu);
    })
})



app.delete('/delete', function(req,res){
    console.log(req.body);
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(req.body, function(err,resu){
        console.log('삭제완료');
        res.status(200).send({ message : '성공했습니다'});
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
    res.redirect('/')
});

app.get('/mypage', whatLogin, function(req,res){
    console.log(req.user);
    res.render('mypage.ejs', {사용자 : req.user})
})

function whatLogin(req,res,next){
    if(req.user){
        next()
    } else {
        res.send('로그인안하셨는데요?')
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


