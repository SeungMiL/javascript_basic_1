let router = require('express').Router();



function whatLogin(req,res,next){
    if(req.user){
        next()
    } else {
        res.send('로그인안하셨는데요? 왜 안하심? 사람 맞음???')
    }
};

router.use(whatLogin);


router.get('/sports', function(req,res){
    res.send('스포츠 게시판');
});

router.get('/game', function(req,res){
    res.send('게임 게시판');
});


module.exports = router;