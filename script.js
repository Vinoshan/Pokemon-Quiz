const question = [
  {
    question: "Who is the 151st Pokemon?",
    answers: [
      { text: "Mew", correct: true },
      { text: "Mewtwo", correct: false },
      { text: "Pikachu", correct: false },
      { text: "Charizard", correct: false },
    ],
  },
  {
    question: "What type is Pikachu?",
    answers: [
      { text: "Electric", correct: true },
      { text: "Fire", correct: false },
      { text: "Water", correct: false },
      { text: "Grass", correct: false },
    ],
  },
  {
    question: "What is the final evolved form of Squirtle?",
    answers: [
      { text: "Blastoise", correct: true },
      { text: "Wartortle", correct: false },
      { text: "Charizard", correct: false },
      { text: "Pikachu", correct: false },
    ],
  },
  {
    question: "What is the final evolved form of Bulbasaur?",
    answers: [
      { text: "Venusaur", correct: true },
      { text: "Ivysaur", correct: false },
      { text: "Charizard", correct: false },
      { text: "Pikachu", correct: false },
    ],
  },
  {
    question: "What is the final evolved form of Charmander?",
    answers: [
      { text: "Charizard", correct: true },
      { text: "Charmeleon", correct: false },
      { text: "Blastoise", correct: false },
      { text: "Pikachu", correct: false },
    ],
  },
  {
    question: "What is the evolved form of Pichu?",
    answers: [
      { text: "Pikachu", correct: true },
      { text: "Raichu", correct: false },
      { text: "Charizard", correct: false },
      { text: "Blastoise", correct: false },
    ],
  },
  {
    question: "What is the evolved form of Jigglypuff?",
    answers: [
      { text: "Wigglytuff", correct: true },
      { text: "Clefairy", correct: false },
      { text: "Charizard", correct: false },
      { text: "Blastoise", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.sort(() => Math.random() - 0.5);

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
  });

  if (isCorrect) {
    score++;
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
  });

  nextButton.style.display = "block";
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < question.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
