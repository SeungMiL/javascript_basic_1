// document.getElementById('hello').innerHTML = '안녕';
// document.getElementById('hi').innerHTML = '올때바밤바';
// document.getElementById('hi').style.fontSize = '50px';



// function openBox(bts,this){
//     document.getElementById('alert').style.display = bts;
//     document.getElementById('alert').style.fontSize = this;
// }



// function plus(num){
//     2 + num
// }

// plus(3)


// var a = 3;

// a = 5;

// console.log(a);


// $('#test').addClass('yellow-bg');

// logBtn = document.querySelector('.btn');

// logBtn.addEventListener('click', function(){
//     document.querySelector('.black-background').style.display = 'block';
// })







$('form').on('submit', function(e){
    if($('#email').val() == ''){
        e.preventDefault();
        $('.email-alert').show();
    } else if($('#password').val() == ''){
        e.preventDefault();
        $('.password-alert').show();
    }
    
})




$('#login').on('click', function(){

    $('.black-background').fadeIn();

});


$('#product-nav').on('click', function(){
    $('.list-group').slideToggle();
})





$('.btn-danger').on('click', function(){
    $('.black-background').fadeOut();
    $('.email-alert').fadeOut();
    $('.password-alert').fadeOut();
})











































