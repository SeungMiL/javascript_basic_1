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




var 이메일안내창 = $('.email-alert');
var 패스워드안내창 = $('.password-alert')
var 입력한이메일 = $('#email').val();
var 입력한패스워드 = $('#password').val();


$('form').on('submit', function(e){
    if(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(입력한이메일) == false){
        e.preventDefault();
    } else if (입력한이메일 == ''){
        e.preventDefault();
    }

    
    if(/[A-Z]+/.test(입력한패스워드) == false){
        e.preventDefault();
    }

    



    // if($('#email').val() == ''){
    //     e.preventDefault();
    //     $('.email-alert').show();
    // } else if($('#password').val() == ''){
    //     e.preventDefault();
    //     $('.password-alert').show();
    // }
    
});


// /\S+@\S+\.\S+/.test('asdf@asd.com')








$('#login').on('click', function(){
    $('.black-background').addClass('slide-down')
    $('.black-background').removeClass('slide-up');
});


$('#product-nav').on('click', function(){
    $('.list-group').slideToggle();
})





$('.btn-danger').on('click', function(){
    $('.black-background').addClass('slide-up');
    $('.black-background').removeClass('slide-down')
    $('.email-alert').fadeOut();
    $('.password-alert').fadeOut();
})




function 삼육구게임(i){
    if( i % 3 == 0){
        console.log('박수');
    } else {
        console.log('통과');
    }
};

삼육구게임(36);

function 삼육구겜(i){
    if(i % 3 == 0 && i % 9 !== 0){
        console.log('박수');
    } else if (i % 9 == 0){
        console.log('박수x2');
    } else {
        console.log('통과');
    }
}

삼육구겜(11);

function 삼육구(i) {
    const numStr = i.toString();
    if (numStr.charAt(numStr.length-1) === '3' || numStr.charAt(numStr.length-1) === '6' || numStr.charAt(numStr.length-1) === '9' ) {
        console.log('박수');
    } else {
        console.log('통과');
    }
}

삼육구(58); 

var 예금액 = 60000;
var 미래예금액 = 0;

if( 예금액 >= 50000){
    미래예금액 = 예금액 * 1.2 * 1.2;
} else {
    미래예금액 = 예금액 * 1.15 * 1.15;
}

console.log(미래예금액);


var 첫커피양 = 360;
var 마신커피 = 0;
var 리필양 = 첫커피양 * 2/3;
var 리필양2 = 리필양 * 2/3;

마신커피 = 첫커피양 + 리필양;
마신커피 = 마신커피 + 리필양2;



console.log(마신커피);



$('#show-menu').on('click', function(){
    $('.left-menu').animate({ marginLeft : '0px'});
})

$('.btn1').on('click', function(){
    $('.slide-container').addClass('slide-origin');
    $('.slide-container').removeClass('slide-move');
    $('.slide-container').removeClass('slide-move2');

})



$('.btn2').on('click', function(){
    $('.slide-container').addClass('slide-move');
    $('.slide-container').removeClass('slide-move2');

})

$('.btn3').on('click', function(){
    $('.slide-container').addClass('slide-move2');
    $('.slide-container').removeClass('slide-move');

})



let slideView = 1;


// $('.slide-next').on('click', function(){
//     if( slideView == 1 ){
//     $('.slide-container').addClass('slide-move');
//     slideView = 2;
//     } else if( slideView == 2){
//         $('.slide-container').addClass('slide-move2');
//     slideView = 3;
//     }
    
// })


$('.slide-next').on('click', function(){

    $('.slide-container').css('transform', 'translateX(-' + slideView + '00vw)');
        if( slideView < 2){
        slideView = slideView + 1;
    }
}
);

$('.slide-before').on('click', function(){

    $('.slide-container').css('transform', 'translateX(-' + (slideView-1) + '00vw)');
        if( slideView > 1){
        slideView = slideView - 1;
    }

}
);



$(window).on('scroll', function(){
    if($(window).scrollTop() > 300){
    $('.nav-menu').addClass('nav-black');
    $('.nav-menu h4').addClass('small-logo');
} else {
    $('.nav-menu').removeClass('nav-black');
    $('.nav-menu h4').removeClass('small-logo');

}
});

// for(let i = 0; i < $('.tab-button').length; i++){
// $('.tab-button').eq(i).on('click', function(){
//     openTab(i)

// })};

$('.list').on('click', function(e){

    openTab(e.target.dataset.id)

})


function openTab(i){
    $('.tab-button').removeClass('active');
    $('.tab-content').removeClass('show');
    $('.tab-button').eq(i).addClass('active');
    $('.tab-content').eq(i).addClass('show');
}

// $('.tab-button').eq(1).on('click', function(){

//     $('.tab-button').removeClass('active');
//     $('.tab-content').removeClass('show');

//     $('.tab-button').eq(1).addClass('active');
//     $('.tab-content').eq(1).addClass('show');
// })

// $('.tab-button').eq(2).on('click', function(){

//     $('.tab-button').removeClass('active');
//     $('.tab-content').removeClass('show');

//     $('.tab-button').eq(2).addClass('active');
//     $('.tab-content').eq(2).addClass('show');
// })

// $('#option1').on('change', function(){
//     if($('#option1').val() == '셔츠'){
//         $('.size-select').show();
//     } else{
//         $('.size-select').hide();
//     }
// });





// $('#option1').on('change', function(){
//     if($('#option1').val() == '셔츠'){
//         $('#option2').html('');
//         var temple = '<option>95</option><option>100</option><option>105</option>';
//         $('#option2').append(temple);
//     }
    
    
//     else if ($('#option1').val() == '바지'){
//         $('#option2').html('');
//         var temple2 = '<option>28</option><option>30</option><option>32</option>';
//         $('#option2').append(temple2);
//     }
// });


let itemSize = [28, 30, 32, 34, 36, 38, 40];

$('#option1').on('change', function(){    
    if ($('#option1').val() == '바지'){
        
        itemSize.forEach(function(i){
            let temple2 = `<option>${i}</option>`;
            $('#option2').append(temple2);
        })
        
    
}});


let array = [7,3,5,2,40];
// array.sort(function(a,b){
//     return a - b;
// });

// ?만원 미만 상품 고를때
// let newArray = array.filter(function(a){
//         return a < 4;
//     })
    // 상품전체 배열에 영향줄때
    // let newArray2 = array.map(function(a){
    //     return a * 2
    // })


let products = [
    { id : 0, price : 70000, title : 'Blossom Dress' },
    { id : 1, price : 50000, title : 'Springfield Shirt' },
    { id : 2, price : 60000, title : 'Black Monastery' },
    { id : 3, price : 55000, title : 'Pupple Onepiece' }
  ];

  let products2 = [...products];

  function groupHtml(){
    products2.forEach(function(a){
        let template3 = `<div class="card">
        <img src="https://via.placeholder.com/600">
        <div class="card-body">
          <h5 class="title">${a.title}</h5>
          <p class="price">가격 : ${a.price}</p>
          <button class="btn btn-danger">주문하기</button>
        </div>
      </div>`;
      $('.card-group').append(template3);
     })
  }


 $('.card-group').html(
     products.forEach(function(a){
        let template2 = `<div class="card">
        <img src="https://via.placeholder.com/600">
        <div class="card-body">
          <h5 class="title">${a.title}</h5>
          <p class="price">가격 : ${a.price}</p>
          <button class="btn btn-danger">주문하기</button>
        </div>
      </div>`;
      $('.card-group').append(template2);
     })
  )

   $('#sortPrice').on('click', function(){
    $('.card').remove();

    groupHtml();


       products2.sort(function(a,b){
           return a.price - b.price
       })
       sortPrice2()

   })

   $('#sortPrice2').on('click', function(){

    $('.card').remove();

    groupHtml();


       products2.sort(function(a,b){
       if(a.title < b.title == true){
           return -1
       } else {
           return 1
       }
       })
       sortPrice2()
   })

   $('#sortPrice3').on('click', function(){
       $('.card').remove();

    let newProduct = products.filter(function(a){
        return a.price <= 60000;
    })

    newProduct.forEach(function(a){
        let template = `        <div class="card">
        <img src="https://via.placeholder.com/600">
        <div class="card-body">
          <h5 class="title">${a.title}</h5>
          <p class="price">가격 : ${a.price}</p>
          <button class="btn btn-danger">주문하기</button>
        </div>
      </div>`;
        $('.card-group').append(template)
    })



})


   function sortPrice1(){
    for(i = 0; i<$('.card').length; i++){
        $('.title').eq(i).html(products[i].title)
        $('.price').eq(i).html('가격 : ' + products[i].price)}
   }

   function sortPrice2(){
    for(i = 0; i<$('.card').length; i++){
        $('.title').eq(i).html(products2[i].title)
        $('.price').eq(i).html('가격 : ' + products2[i].price)}
   }




 for(i = 0; i<$('.card').length; i++){
  $('.title').eq(i).html(products[i].title)
  $('.price').eq(i).html('가격 : ' + products[i].price)

//   $('.title').eq(1).html(products[1].title)
//   $('.price').eq(1).html('가격 : ' + products[1].price)

//   $('.title').eq(2).html(products[2].title)
//   $('.price').eq(2).html('가격 : ' + products[2].price)
}



$(window).on('scroll', function(){
    let height = $(window).scrollTop();
    console.log(height);

    let y = (-1/800) * height + 87/7;

    let z = (-1/5600) * height + 132/50;


    
    $('.card-box').eq(0).css('opacity', y);
    $('.card-box').eq(0).css('transform', `scale(${z})`);

    

})

let typeH = document.querySelector('.typetitle');

let originType = document.querySelector('.typetitle').innerHTML;

document.querySelector('.typebtn').addEventListener('click', function(){
    typeH.innerHTML = '';

    for(let i = 0; i < originType.length; i++){
    setTimeout(function(){
        
        typeH.innerHTML = typeH.innerHTML + originType[i]
    }, 100 * i)}
})

