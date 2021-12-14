document.getElementById('hello').innerHTML = '안녕';
document.getElementById('hi').innerHTML = '올때바밤바';
document.getElementById('hi').style.fontSize = '50px';



function openBox(hole){
    document.getElementById('alert').style.display = hole;
}

function closeBox(){
    document.getElementById('alert').style.display = 'none';
}