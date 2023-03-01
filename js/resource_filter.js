const arrow = document.getElementsByClassName("arrow-ini");
const open = document.getElementsByClassName("open");
const options = document.getElementsByClassName("options");

const sem = document.getElementsByClassName("sem");
const course_first = document.getElementById("course_first");
const sem_first = document.getElementById("sem_first");

const no_data = document.getElementById("no_data");

const course_drop = document.getElementById("course_drop")
const sub_drop = document.getElementById("sub_drop")
const sem_drop = document.getElementById("sem_drop")

let wake_url = "https://pastoral-storm-bard.glitch.me/wakeup"

async function wakeup(){
    let response = await fetch(wake_url, {
        method: 'GET',
    });
    let responseText = await response.text();
    console.log(responseText);
}
wakeup();

function display_options(n) {

    let arrow = document.getElementsByClassName("arrow")[n];
    let options = document.getElementsByClassName("options")[n];

    if (!options.classList.contains('active')) {
        options.classList.add('active');
        options.style.height = 'auto';
        let height = options.clientHeight + "px";
        options.style.height = '0px';
        setTimeout(function () {
            options.style.height = height;
            if (height.slice(0,-2) >= 170){
                if(n==0) sem_drop.classList.add('course_drop');
                if(n==1) sem_drop.classList.add('sem_drop');
                if(n==2) sub_drop.classList.add('sub_drop');
            }
        }, 0);
    }
    else {
        options.style.height = '0px';
        options.addEventListener('transitionend', function () {
            options.classList.remove('active');
        }, {
            once: true
        });
    }

    if (arrow.classList.contains("reverse")) {
        arrow.classList.add("forward");
        arrow.classList.remove("arrow-ini");
        arrow.classList.add("arrow-fin");
        arrow.classList.remove("reverse");
    }
    else {
        arrow.classList.add("reverse");
        arrow.classList.remove("arrow-fin");
        arrow.classList.add("arrow-ini");
        arrow.classList.remove("forward");
    }
}

arrow[0].addEventListener("click", display_options.bind(this, 0));
open[0].addEventListener("click", display_options.bind(this, 0));
arrow[1].addEventListener("click", display_options.bind(this, 1));
open[1].addEventListener("click", display_options.bind(this, 1));
arrow[2].addEventListener("click", display_options.bind(this, 2));
open[2].addEventListener("click", display_options.bind(this, 2));

window.onclick = function (event) {

    let c = document.getElementsByClassName("reverse");

    if (c.length != 0) {

        let x = c.length;

        let n;
        let b;

        if (x >= 2) { 
            if (event.target.matches('.course')){
                a = c[1].classList;
            }
            else if (event.target.matches('.semester')){
                if (c[0].classList.contains('course')){
                    a = c[0].classList;
                }
                else {
                    a = c[1].classList;
                }
            }
            else if (event.target.matches('.subject')){
                a = c[0].classList;
            }
        }
        else { a = c[0].classList; }
        
        if (a.contains('course')) {
            n = 0;
            b = ".course"
        }
        else if (a.contains('semester')) {
            n = 1;
            b = ".semester";
        }
        else if (a.contains('subject')) {
            n = 2;
            b = ".subject";
        }

        let arrow = document.getElementsByClassName("arrow")[n];
        let options = document.getElementsByClassName("options")[n];

        if (!(event.target.matches(b))) {

            arrow.classList.add("forward");
            arrow.classList.remove("arrow-ini");
            arrow.classList.add("arrow-fin");
            arrow.classList.remove("reverse");

            if (x==2){
                options.classList.remove('active');
                options.style.height = '0px';
            }

            else{
                options.style.height = '0px';
                options.addEventListener('transitionend', function () {
                    options.classList.remove('active');
                    
                }, {
                    once: true
                });
            }
        }
    }
}

function sem_toggle(value, n){
    let t = document.getElementsByClassName('sub');
    for (let i=0; i<t.length; i++){
        t[i].classList.add('hide');
    }
    if (value == "Applied Sciences"){
        sem[0].classList.remove('hide');
        sem[1].classList.remove('hide');
        sem[2].classList.add('hide');
        sem[3].classList.add('hide');
        sem[4].classList.add('hide');
        sem[5].classList.add('hide');
        sem[6].classList.add('hide');
        sem[7].classList.add('hide');
    }
    else {
        sem[0].classList.add('hide');
        sem[1].classList.add('hide');
        sem[2].classList.remove('hide');
        sem[3].classList.remove('hide');
        sem[4].classList.remove('hide');
        sem[5].classList.remove('hide');
        sem[6].classList.remove('hide');
        sem[7].classList.remove('hide');
    }
    course_first.classList.add('hide');
    sem_first.classList.remove('hide');
    open[1].textContent = 'Select Semester';
    open[2].textContent = 'Select Subject';
}

function sub_toggle(value, n){
    let t = document.getElementsByClassName('sub');
    for (let i=0; i<t.length; i++){
        t[i].classList.add('hide');
    }
    let a = open[0].textContent.toLowerCase();
    let b = value.toLowerCase();
    if (a=="applied sciences"){
        a="as";
    }
    let c = a + b;
    let d = document.getElementsByClassName(c);
    if(d.length==0){
        sub_drop.classList.remove('sub_drop');
        no_data.classList.remove('hide');
    }
    else{
        no_data.classList.add('hide');
    }
    for (let i=0; i<d.length; i++){
        d[i].classList.remove('hide');
    }
    sem_first.classList.add('hide');
    open[2].textContent = 'Select Subject';
}

function selected(value, n) {
    open[n].textContent = value;
    if (n==0){
        sem_toggle(value, n);
        sub_drop.classList.remove('sub_drop');
    }
    if (n==1){
        sub_toggle(value, n);
    }
}

function submit(){
    let a,b,e,fcourse,fsem,fsub;
    a = open[0].textContent;
    b = open[1].textContent;
    fcourse = a.toLowerCase();
    fsem = b.toLowerCase();
    if (fcourse=="applied sciences"){
        fcourse="as";
    }
    let c = fcourse + fsem;
    let d = document.getElementsByClassName(c);
    for (let i=0; i<d.length; i++){
        if (d[i].textContent == open[2].textContent){
            fsub = d[i].value;
            e = d[i].textContent;
            break;
        }
    }
    if (fsub){
        
        window.open('resource_display.html', '_self');
        sessionStorage.setItem("course",a);
        sessionStorage.setItem("semester",b);
        sessionStorage.setItem("subject",e);
        sessionStorage.setItem("fcourse",fcourse);
        sessionStorage.setItem("fsem",fsem);
        sessionStorage.setItem("fsub",fsub);
        
    }
    return a;
}

function redirect(ind){
    if (ind==0){window.open('https://p.paytm.me/xCTH/zzjlmo6o');}
    if (ind==1){window.open('https://github.com/ota0912/msit-notes/');}
    else{window.open('https://bio.link/msitnotes');}
}

