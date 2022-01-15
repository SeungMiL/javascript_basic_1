let router = require('express').Router();


function whatLogin(req,res,next){
    if(req.user){
        next()
    } else {
        res.send('로그인안하셨는데요? 왜 안하심? 사람 맞음???')
    }
};


router.get('/shirts',whatLogin, function(req,res){
    res.send('셔츠 파는 페이지입니다.');
});

router.get('/pants',whatLogin, function(req,res){
    res.send('바지 파는 페이지입니다.')
});


module.exports = router;