class MathGame {
    constructor() {
        this.score = 0;
        this.currentQuestion = null;
        this.answerInput = document.getElementById('answerInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.questionDisplay = document.getElementById('question');
        this.scoreDisplay = document.getElementById('score');
        this.feedbackDisplay = document.getElementById('feedback');
        this.gameContent = document.getElementById('gameContent');
        this.winScreen = document.getElementById('winScreen');
        this.restartBtn = document.getElementById('restartBtn');

        this.setupEventListeners();
        this.generateQuestion();
    }

    setupEventListeners() {
        this.submitBtn.addEventListener('click', () => this.checkAnswer());
        this.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
        this.restartBtn.addEventListener('click', () => this.restartGame());
    }

    generateQuestion() {
        const operationTypes = ['+', '-', '*'];
        const operation = operationTypes[Math.floor(Math.random() * operationTypes.length)];

        let num1, num2;

        if (operation === '-') {
            // Ensure positive result for subtraction
            num1 = Math.floor(Math.random() * 20) + 10;
            num2 = Math.floor(Math.random() * num1);
        } else if (operation === '*') {
            // Keep multiplication simpler
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
        } else {
            // Addition
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;
        }

        let correctAnswer;
        if (operation === '+') {
            correctAnswer = num1 + num2;
        } else if (operation === '-') {
            correctAnswer = num1 - num2;
        } else {
            correctAnswer = num1 * num2;
        }

        this.currentQuestion = {
            num1,
            num2,
            operation,
            answer: correctAnswer,
            display: `${num1} ${operation} ${num2} = ?`
        };

        this.questionDisplay.textContent = this.currentQuestion.display;
        this.answerInput.value = '';
        this.feedbackDisplay.textContent = '';
        this.answerInput.focus();
    }

    checkAnswer() {
        const userAnswer = parseInt(this.answerInput.value);

        if (isNaN(userAnswer)) {
            this.feedbackDisplay.textContent = 'Please enter a valid number!';
            this.feedbackDisplay.className = 'feedback feedback-error';
            return;
        }

        if (userAnswer === this.currentQuestion.answer) {
            this.score++;
            this.scoreDisplay.textContent = this.score;
            this.feedbackDisplay.textContent = '✓ Correct! Great job!';
            this.feedbackDisplay.className = 'feedback feedback-success';

            if (this.score === 5) {
                this.showWinScreen();
            } else {
                setTimeout(() => this.generateQuestion(), 1500);
            }
        } else {
            this.feedbackDisplay.textContent = `✗ Incorrect! The answer is ${this.currentQuestion.answer}`;
            this.feedbackDisplay.className = 'feedback feedback-error';
            setTimeout(() => this.generateQuestion(), 2000);
        }
    }

    showWinScreen() {
        this.gameContent.classList.add('hidden');
        this.winScreen.classList.remove('hidden');
    }

    restartGame() {
        this.score = 0;
        this.scoreDisplay.textContent = '0';
        this.gameContent.classList.remove('hidden');
        this.winScreen.classList.add('hidden');
        this.generateQuestion();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MathGame();
});
