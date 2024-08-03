const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let questions = [];

async function fetchQuestions() {
    const response = await fetch('/api/questions');
    questions = await response.json();
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(button);
    });
}

async function selectOption(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const response = await fetch('/api/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: question._id, selectedAnswerIndex: selectedIndex })
    });
    const result = await response.json();

    const buttons = optionsElement.querySelectorAll('.option-button');
    buttons.forEach((button, index) => {
        if (index === question.correctAnswerIndex) {
            button.classList.add('correct');
        } else if (index === selectedIndex) {
            button.classList.add('incorrect');
        }
    });

    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextButton.style.display = 'none';
    } else {
        quizContainer.innerHTML = '<h2>Quiz Complete!</h2>';
    }
});

fetchQuestions();
