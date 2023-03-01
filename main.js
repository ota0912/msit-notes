const slides = document.getElementsByClassName("slides");

const next = document.getElementById("next");
const prev = document.getElementById("prev");

let ind = -1;
let initial;

let wake_url = "https://pastoral-storm-bard.glitch.me/wakeup"

async function wakeup(){
    let response = await fetch(wake_url, {
        method: 'GET',
    });
    let responseText = await response.text();
    console.log(responseText);
}
wakeup();

function switch_slides(){
    for (let i = 0; i < slides.length; i++){
        slides[i].classList.add('hide');
        slides[i].classList.remove('fade');
    }
    if (ind>=slides.length-1){
        ind = -1;
    }
    if (ind<=(slides.length-1)*-1){
        ind = 1;
    }
    ind++;
    
    slides[ind].classList.remove('hide');
    slides[ind].classList.add('fade');
   
    initial = window.setTimeout(switch_slides, 3000);
        
}

switch_slides(ind);

next.addEventListener("click", function(){
    clearTimeout(initial);
    switch_slides();
});

prev.addEventListener("click", function(){
    clearTimeout(initial);
    ind = ind - slides.length + 1;
    switch_slides();
});

function redirect(ind){
    if (ind==0){window.open('https://p.paytm.me/xCTH/zzjlmo6o');}
    if (ind==1){window.open('https://github.com/ota0912/msit-notes/');}
    else{window.open('https://bio.link/msitnotes');}
}
