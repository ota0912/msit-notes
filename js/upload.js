const course = document.getElementById("course");
const semester = document.getElementById("semester");
const subject = document.getElementById("subject");
const type = document.getElementById("type");

const sem = document.getElementsByClassName("sem")
const sub = document.getElementsByClassName("sub");

const other = document.getElementsByClassName("other");

const iframe = document.getElementById("stop_redirecting");

const uploading = document.getElementById("uploading");
const uploaded = document.getElementById("uploaded");

function file_toggle() {
    uploading.classList.add("hide");
    uploaded.classList.add("hide");
}

function sem_toggle() {

    uploading.classList.add("hide");
    uploaded.classList.add("hide");

    semester.value = "none";
    subject.value = "none";

    other[0].classList.add("hide");
    other[1].classList.remove("hide");

    for (i in sub) {
        try {
            sub[i].classList.add("hide");
        }
        catch {
            break;
        }
    }

    sem[0].classList.add("hide");
    sem[1].classList.add("hide");
    sem[2].classList.add("hide");

    if (course.value == 'as') {
        sem[0].classList.remove("hide");
        sem[1].classList.remove("hide");
    }

    else {
        sem[2].classList.remove("hide");
    }

}

course.addEventListener("change", sem_toggle);

function sub_toggle() {

    uploading.classList.add("hide");
    uploaded.classList.add("hide");

    subject.value = "none";

    other[0].classList.add("hide");
    other[1].classList.add("hide");

    for (i in sub) {

        try {
            sub[i].classList.remove("hide");
            let a = !sub[i].classList.contains(semester.value);
            let b = !sub[i].classList.contains(course.value);
            if (a || b){
                sub[i].classList.add("hide");
            }
        }
        catch {
            break;
        }
    }

}

semester.addEventListener("change", sub_toggle);

function form_submit() {
    if (course.value=="none" || semester.value=="none" || subject.value=="none" || type.value=="none"){
        return;
    }

    uploaded.classList.add("hide");

    uploading.classList.remove("hide");
    iframe.addEventListener("load", upload_finished);

}

function upload_finished(){
    uploading.classList.add("hide");
    uploaded.classList.remove("hide");
}
