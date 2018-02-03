class Quiz{
    constructor(text,choices,answer){
        this.text=text;
        this.choices=choices;
        this.answer=answer;
    }
}
const questionList1=[
    new Quiz("mental break time. you deserve an easy question.what is 1+1?",["not this one","still not sure","2","you have gone too far go back"],"3"),
    new Quiz("Eskimos keep their food in a fridge to stop it from freezing?",["false","true","sometimes","only during winter"],"1"),
    new Quiz("What is the capital of Canada?",[" capital 'C'","Ottowa","what is capital?","Vancouver"],"2"),
    new Quiz("mental break time. you deserve an easy question Again.what is 1+1?",["again?","still not sure","2","you have gone too far go back"],"3"),
    new Quiz("Eskimos keep their food in a fridge to stop it from freezing?",["false","true","sometimes","only during winter"],"1"),
    new Quiz("What is the capital of Canada?",[" capital 'C'","Ottowa","what is capital?","Vancouver"],"2")
];

const questionList2=[
    new Quiz("which one is correct?",["correct","wrong","wrong","wrong"],"1"),
    new Quiz("which one is Not correct?",["correct","correct","wrong","correct"],"3"),
    new Quiz("which one is Not NOT correct?",["correct","wrong","wrong","wrong"],"1"),
    new Quiz("what is 1 + 2",["1","2","3","4"],"3")
];

class UI{
    constructor(question){
        this.question=question;
    }
    question_UI(){
        let element=document.getElementById("question");
        element.innerHTML=this.question.text;
    }
    displayFullResult_UI(status){
        let element=document.getElementById("finalResult");
        if(status==="Failed"){
            element.classList.add("bg-danger");
            element.innerHTML=status;
        }else{
            element.classList.add("bg-success");
            element.innerHTML=status;
        }

    }
    options_UI(){
        for(let i=0;i<this.question.choices.length;i++){
            let element=document.getElementById("btn-"+(i+1));
            element.value=this.question.choices[i];
        }
    }
    questionNumber_UI(index){
        let element=document.getElementById("questionNumber");
        element.innerHTML="Question Number "+(index+1);
    }
    result_UI(res){
        let element=document.getElementById("result");
        element.innerHTML=res;
    }
    update_UI(index,res){
        this.question_UI();
        this.options_UI();
        this.questionNumber_UI(index);
        this.result_UI(res);
    }
}








class Controller{
    constructor(questionList1){
        this.totalAsked=0;
        this.totalCorrect=0;
        this.questionList=questionList1;
        this.currentQuestion =0;
        this.endQuezStatus=false;
    }
    checkEndQuiz(){
        if(this.totalAsked === (this.questionList.length)){
            this.endQuezStatus=true;
        }
        return this.endQuezStatus;
    }

    nextQuestion(){
        if(this.currentQuestion<this.questionList.length-1){
            this.currentQuestion=this.currentQuestion+1;
        }
    }
    checkAnswer(answer){
        if(!this.checkEndQuiz()){
            if(this.questionList[this.currentQuestion].answer===answer){
                this.totalCorrect=this.totalCorrect+1;
            }
        }
    }
    addTotalAsked(){
        if(!this.checkEndQuiz()){
            this.totalAsked=this.totalAsked+1;
        }
    }
    calculateScore(){
        if(this.currentQuestion>0){
            return (this.totalCorrect / this.totalAsked)*100;
        }else{
            return "waiting for your first response";
        }
    }

    update(){
        let ui=new UI(this.questionList[this.currentQuestion]);
        ui.update_UI(this.currentQuestion,this.calculateScore());

    }

    clicked(controller){
        document.querySelector(".container").addEventListener("click",function(event) {
                let target1=event.target.id;
                let aTarget=target1.split("-");
                if(aTarget[0]==="btn") {
                        controller.checkAnswer(aTarget[1]);
                        controller.addTotalAsked();
                        controller.nextQuestion();
                }
            if(controller.checkEndQuiz()){
                let ui=new UI(controller.questionList[Controller.currentQuestion]);
                if(controller.calculateScore()>49.9){
                    ui.displayFullResult_UI("Pass");
                }else{
                    ui.displayFullResult_UI("Failed");
                }
            }
            controller.update();
        });
    }
}

let q=localStorage.getItem("questionNumber");
let questionList;
document.getElementById("quiz").textContent=localStorage.getItem("quizName");
if(parseInt(q)===1){
    questionList=questionList1;
}else{
    questionList=questionList2;
}

let controller=new Controller(questionList);


controller.update();
controller.clicked(controller);