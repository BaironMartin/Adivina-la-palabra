let words = [];
let currentWord = "";
let scrambledWord = "";
let tries = 0;
let maxTries = 5;
let mistakes = [];

fetch('words.json')
    .then(response => response.json())
    .then(data => {
        words = data;
        randomWord();
    });

function randomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    scrambledWord = shuffleWord(currentWord);
    document.getElementById('scrambled-word').textContent = scrambledWord;
    createInputBoxes(currentWord.length); // Crear cajas de entrada basadas en la longitud de la palabra
    resetGame();
}

function shuffleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function createInputBoxes(length) {
    const lettersContainer = document.getElementById('letters');
    lettersContainer.innerHTML = ''; // Limpiar cualquier caja existente

    for (let i = 0; i < length; i++) {
        const inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.maxLength = 1;
        inputBox.classList.add('letter-input');
        lettersContainer.appendChild(inputBox);
    }
}

function resetGame() {
    tries = 0;
    mistakes = [];
    document.getElementById('tries').textContent = tries;
    document.getElementById('mistakes').textContent = mistakes.join(', ');

    const letterInputs = document.querySelectorAll('.letter-input');
    letterInputs.forEach(input => input.value = "");
}

function checkGuess() {
    const letterInputs = document.querySelectorAll('.letter-input');
    // Convierte el intento del usuario a minúsculas y elimina espacios en blanco
    const guess = Array.from(letterInputs)
        .map(input => input.value.toLowerCase().trim())
        .join('');

    // Compara el intento con la palabra correcta, también en minúsculas
    if (guess === currentWord.toLowerCase()) {
        alert("¡Correcto!");
        randomWord(); // Genera una nueva palabra
    } else {
        tries++;
        mistakes.push(guess);
        document.getElementById('tries').textContent = tries;
        document.getElementById('mistakes').textContent = mistakes.join(', ');

        if (tries >= maxTries) {
            alert("¡Intentos agotados! La palabra correcta era: " + currentWord);
            randomWord(); // Genera una nueva palabra si los intentos se agotan
        }
    }
}
