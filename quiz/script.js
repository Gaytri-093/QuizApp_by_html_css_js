let currentCategory;
let currentQuestionIndex = 0;
let score = 0;
let timer;


    // start startQuiz

function startQuiz() {
    
    document.getElementById("select").style.display="block";
    document.getElementById("userDetailsSection").style.display = "none";
    document.getElementById("categorySection").style.display = "block";
    document.getElementById("quizPage").style.display = "none";
    document.getElementById("resultPage").style.display = "none";
}

function startCategory(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("categorySection").style.display = "none";
    document.getElementById("quizPage").style.display = "block";
    loadQuestion();
    startTimer();
}



function loadQuestion() {
    const questionContainer = document.getElementById("questionContainer");
    const currentQuestion = questions[currentCategory][currentQuestionIndex];

    if (currentQuestionIndex === questions[currentCategory].length) {
        finishQuiz();
        return;
    }

    const optionsHTML = currentQuestion.options.map((option, index) => `<button onclick="checkAnswer(${index})">${option}</button>`).join('');

    questionContainer.innerHTML = `
        <h2>Question ${currentQuestionIndex + 1}/${questions[currentCategory].length}</h2>
        <p class="questioncontent">${currentQuestion.question}</p>
        <div id="optionsContainer">
        ${optionsHTML}
    </div>
        
    `;
}


        //  check answers

function checkAnswer(optionIndex) {
    const currentQuestion = questions[currentCategory][currentQuestionIndex];
    const selectedOption = currentQuestion.options[optionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;

        
    }
    console.log(score);

     document.getElementById("scoreValue").textContent = score;
    
    // Highlight the correct and incorrect options
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.children[optionIndex].classList.add(selectedOption === currentQuestion.correctAnswer ? "correct" : "incorrect");

    // Disable further clicks on options
    for (let i = 0; i < optionsContainer.children.length; i++) {
        optionsContainer.children[i].disabled = true;
    }

   

}
    //   Question changes one by one


function nextQuestion() {
    const optionsContainer = document.getElementById("optionsContainer");
    for (let i = 0; i < optionsContainer.children.length; i++) {
         optionsContainer.children[i].classList.remove("correct", "incorrect");
        optionsContainer.children[i].disabled = false;
        console.log(optionsContainer);
    }

    currentQuestionIndex++;
    loadQuestion();
    document.getElementById("quizPage").querySelector("button").style.display = "inline-block";
}
    //  Timer Function


function startTimer() {
    let timeLeft = 60;
    document.getElementById("timer").textContent = ` ${timeLeft} `;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = ` ${timeLeft} `;

        if (timeLeft === 0) {
            clearInterval(timer);
            finishQuiz();
        }
    }, 1000);
}


    //   Result Display after question finishing
function finishQuiz() {
    clearInterval(timer);
    document.getElementById("quizPage").style.display = "none";
    document.getElementById("resultPage").style.display = "block";

    const totalQuestions = questions[currentCategory].length;
    const attempted = currentQuestionIndex;
    const correctAnswers = score;
    const wrongAnswers = attempted - correctAnswers;
    const percentage = (correctAnswers / totalQuestions) * 100;
    console.log("totalque",totalQuestions);
    console.log("attempted",attempted);
    console.log("correct",correctAnswers);
    console.log("wrong",wrongAnswers);
    console.log("percentage",percentage ,"%");
    document.getElementById("resultPage").innerHTML=`
    <h2>Quiz Result </h2>
    <p>Name of Participant: ${document.getElementById("userName").value}</p>
    <p>Total Questions: ${totalQuestions}</p>
    <p>Attempted: ${attempted}</p>
    <p>Correct Answers: ${correctAnswers}</p>
    <p>Wrong Answers: ${wrongAnswers}</p>
    <p>Score: ${percentage}%</p>
    <div class="last" >
    <button onclick="startQuiz()">Start Again</button>
    <button onclick="goToHome()">Go To Home</button>
    </div>
    `
   
}

        //  Back To Home

function goToHome() {
    document.getElementById("resultPage").style.display = "none";
    document.getElementById("userDetailsSection").style.display = "block";
}