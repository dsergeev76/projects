let money = document.getElementById("money");
let bill_acc = document.getElementById("bill_acc");
let displayInfo = document.getElementById("displayInfo");
let balance = document.getElementById("balance");
let banknotes = document.querySelectorAll("img[src$='rub.jpg']");
let change_box = document.getElementById("change_box");
let progressBar = document.querySelector(".progress-bar");
let coffe_mug = document.getElementById("coffe_mug");
let blocker = document.getElementById("blocker");
for(let i=0; i<banknotes.length; i++){
  banknotes[i].onmousedown = function(event) {
    banknotes[i].style.zIndex = 100;
    banknotes[i].style.transform = "rotate(90deg)";
    banknotes[i].style.top = event.clientY-90+"px";
    banknotes[i].style.left= event.clientX-90+"px";
    
    function moveAt(e){
banknotes[i].style.top = (e.clientY-banknotes[i].width/2)+"px";
banknotes[i].style.left= (e.clientX-banknotes[i].width/2)+"px";
    }
    
    document.addEventListener("mousemove",moveAt);
    
    document.onmouseup = function(){
banknotes[i].style.zIndex = 0;

let note_top = banknotes[i].getBoundingClientRect().top;
let note_right=banknotes[i].getBoundingClientRect().right;
let note_left=banknotes[i].getBoundingClientRect().left;

let bill_acc_top = bill_acc.getBoundingClientRect().top;
let bill_acc_right=bill_acc.getBoundingClientRect().right;
let bill_acc_left=bill_acc.getBoundingClientRect().left;
let bill_acc_bottom=bill_acc.getBoundingClientRect().bottom - (bill_acc.height/3)*2;

if (note_top>bill_acc_top && note_right<bill_acc_right && note_left>bill_acc_left && note_top<bill_acc_bottom){
  banknotes[i].hidden = true;
  money.value = +money.value + +banknotes[i].dataset.denomination;
  balance.innerText = "Ваш баланс: "+money.value+" руб.";
  let audio = new Audio("audio/bankomat.mp3").play();
  audio.play();
}
document.removeEventListener("mousemove",moveAt);
    }
  
    banknotes[i].ondragstart = function(){return false;}
    
    }
  
}

coffe_mug.onclick = function(){
  this.style.opacity = 0;
}

function getCoffee(coffeeName,cost){
  if (money.value >= cost) {
    blocker.style.height = window.innerHeight+"px";
    money.value = money.value-cost;
    balance.innerText = "Ваш баланс: "+money.value+" руб.";
    //displayInfo.innerText = "Ваш кофе "+coffeeName+" готов!";
    let w = 0;
    progressBar.hidden = false;
    let timerId = setInterval(function(){
progressBar.style.width = (++w)+"%";
coffe_mug.style.opacity = w/100;
if (w==105){
  progressBar.hidden = true;
  progressBar.style.width = "0%";
  displayInfo.innerText = `Кофе ${coffeeName} готов!`;
  blocker.style.height = 0+"px";
  clearInterval(timerId);
}else if (w<40){
  displayInfo.innerHTML = `<i class="fas fa-hourglass-start"></i> ожидайте...`;
}else if (w<75){
  displayInfo.innerHTML = `<i class="fas fa-hourglass-half"></i> ожидайте...`;
}else{
  displayInfo.innerHTML = `<i class="fas fa-hourglass-end"></i> ожидайте...`;
}
    },100);
    
    let audio = new Audio("audio/get_coffee.mp3").play();
    audio.play();
  }  
  else {
    displayInfo.innerText = "Нет денег - нет кофе!";
  }
}

function getChange(num){
  /*if (num>=10) coin = 10;
  else if(num>=5) coin=5;
  else if(num>=2) coin=2;
  else if(num>=1) coin=1;
  if (coin>0){
    console.log(coin);
    getChange(num-coin);
  }*/
  let sound = false;
  
  while (num>0){
    let coin=0;
    if (num>=10) {
coin = 10;
    }
    else if(num>=5) {
coin = 5;
    }
    else if(num>=2) {
coin = 2;
    }
    else if(num>=1){
coin = 1;
    }
    
    num = num-coin;
    
    if (coin>0){
let top = getRandom(0, change_box.offsetHeight-64);
let left= getRandom(0, change_box.offsetWidth-64);
change_box.innerHTML += `<img onclick="this.hidden=true" src="images/${coin}rub.png" style="top:${top}px; left:${left}px;">`;
sound = true;
    } 
  }
  money.value = 0;
  balance.innerText = "Ваш баланс: "+money.value+" руб.";
  displayInfo.innerText = "Внесите деньги и закажите напиток";
  if (sound) {
    let audio = new Audio("audio/get_change.mp3").play();
    audio.play();
  }
}

function getRandom(min,max){
  return Math.random()*(max-min)+min;
}