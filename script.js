const quizData = [
    {
        question: "Which is the largest animal in the world?",
        options: ["shark", "blue whale", "dolphin", "starfish"],
        answer: "blue whale"
    },
    {
        question: "Which is the smallest continent in the world?",
        options: ["Asia", "Australia", "Arctic", "Africa"],
        answer: "Australia"
    },
    {
        question: "Which is the smallest country in the world?",
        options: ["Vatican City", "Bhutan", "Nepal", "Shri Lanka"],
        answer: "Vatican City"
    },
    {
        question: "Which is the most educated state in India?",
        options: ["Bihar", "Kerela", "Goa", "Haryana"],
        answer: "Kerela"
    },
    {
        question: "Which is the busiest Railway station in India?",
        options: ["Howrah Junction", "Chhatrapati Shivaji Terminus", "New Delhi Station", "Lucknow railway station"],
        answer: "Howrah Junction"
    },
    {
        question: "How many countries share borders with India?",
        options: ["3", "5", "9", "7"],
        answer: "9"
    },
    {
        question: "Which is an input device?",
        options: ["printer", "scanner", "monitor", "projector"],
        answer: "scanner"
    },
    {
        question: "Which country is known as the Land of Festivals?",
        options: ["Nepal", "India", "Spain", "Qatar"],
        answer: "India"
    },
    {
        question: "Which is an output device?",
        options: ["printer", "scanner", "keyboard", "joystick"],
        answer: "printer"
    },
    {
        question: "Which is the longest beach in India?",
        options: ["Puri beach", "Marina beach", "Dandi beach", "Juhu beach"],
        answer: "Marina beach"
    },
];

const questionNumberElement = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const timerElement = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;
let answerSelected = false;

function loadQuestion() {
    const { question, options } = quizData[currentQuestionIndex];
    questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    questionElement.textContent = question;
    optionsContainer.innerHTML = "";

    options.forEach((optionText) => {
        const option = document.createElement("button");
        option.textContent = optionText;
        option.classList.add("option");
        option.onclick = () => selectOption(option);
        optionsContainer.appendChild(option);
    });

    answerSelected = false;
    nextBtn.disabled = true;
    startTimer();
}

function selectOption(option) {
    if (!answerSelected) {
        answerSelected = true;
        const selectedAnswer = option.textContent;
        const correctAnswer = quizData[currentQuestionIndex].answer;

        if (selectedAnswer === correctAnswer) {
            score++;
            option.classList.add("correct");
        } else {
            option.classList.add("incorrect");
            const correctOption = Array.from(optionsContainer.children).find(
                (opt) => opt.textContent === correctAnswer
            );
            correctOption.classList.add("correct");
        }

        nextBtn.disabled = false;
        clearInterval(timer);
    }
}

function loadNextQuestion() {
    clearInterval(timer);
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResult();
    }
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 10;
    timerElement.textContent = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answerSelected) {
                loadNextQuestion();
            }
        }
    }, 1000);
}

function showResult() {
    const quizElement = document.getElementById("quiz");
    quizElement.classList.add("hide");
    resultElement.classList.remove("hide");
    scoreElement.textContent = `${score} out of ${quizData.length}`;
}

nextBtn.addEventListener("click", () => {
    loadNextQuestion();
});

// Start the quiz
loadQuestion();
