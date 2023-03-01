const course = sessionStorage.getItem("course");
const semester = sessionStorage.getItem("semester");
const subject = sessionStorage.getItem("subject");

const fcourse = sessionStorage.getItem("fcourse");
const fsemester = sessionStorage.getItem("fsem");
const fsubject = sessionStorage.getItem("fsub");

const content = document.getElementsByClassName("content")[0];

const ops = document.getElementsByClassName("ops");
const opts = document.getElementsByTagName("section")[0];

document.getElementById("course").textContent = course;
document.getElementById("semester").textContent = semester;
document.getElementById("subject").textContent = subject;

let ind;
// let url = "http://localhost:8080/fetchData";
let url = "https://pastoral-storm-bard.glitch.me/fetchData"
let wake_url = "https://pastoral-storm-bard.glitch.me/wakeup"

async function wakeup(){
    let response = await fetch(wake_url, {
        method: 'GET',
    });
    let responseText = await response.text();
    console.log(responseText);
}
wakeup();

let nums = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
}
let indices = {
    0: "assignments",
    1: "class-notes",
    2: "viva-material",
    3: "pyq",
    4: "practical-file",
    5: "books",
}

if (course){
    function selected(ind){
        for (let i=0; i<ops.length; i++){
            if (ops[i].classList.contains("selected")){
                ops[i].classList.remove("selected");
                break;
            }
        }
        ops[ind].classList.add("selected");

        let object = { 
            "course": fcourse, 
            "sem": nums[fsemester],
            "sub": fsubject,
            "type": indices[ind]
        };

        async function postReq(obj){

            if(screen.width<=520){opts.style.minHeight = "64vh";}
            else {opts.style.minHeight = "50vh";}
            content.innerHTML = "";

            let loading = document.createElement("p");
            loading.textContent = "Waiting for bitches to pull up!";
            loading.className = "loading";
            content.appendChild(loading);

            let loadingDots = document.createElement("div");
            loadingDots.className = "dot-flashing";
            content.appendChild(loadingDots);

            let response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });
            let responseText = await response.text();
            let fileList = JSON.parse(responseText);
            
            content.innerHTML = "";

            if (responseText=="{}"){
                let para = document.createElement("p");
                para.textContent = "404! This directory is as empty as your DMS!";
                para.className = "error";
                content.appendChild(para);
                return;
            }
            for (i in fileList){
                let btn = document.createElement("BUTTON");
                btn.textContent = i;
                btn.className = "element";
                btn.onclick = function(){
                    window.open(fileList[btn.textContent]);
                };
                content.appendChild(btn);
            }

            content.scrollIntoView();
        }
        postReq(object);

    }

}
else {
    alert("Breathe Air");
} 

function redirect(ind){
    if (ind==0){window.open('https://p.paytm.me/xCTH/zzjlmo6o');}
    if (ind==1){window.open('https://github.com/ota0912/msit-notes/');}
    else{window.open('https://bio.link/msitnotes');}
}

