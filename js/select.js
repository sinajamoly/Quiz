let questionNumber;

document.querySelector(".container").addEventListener("click",function(event) {
    let target1=event.target.id;
    let aTarget=target1.split("-");
    if(aTarget[0]==="btn") {
        console.log(aTarget[1]);
        localStorage.setItem("questionNumber",aTarget[1]);
        localStorage.setItem("quizName",document.getElementById(target1).textContent);
        window.location.replace("index.html");
    }
});
