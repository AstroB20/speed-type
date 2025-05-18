// script.js

const quoteText = document.getElementById('quote').innerText;
const inputField = document.getElementById('typedInput');
const timeDisplay = document.getElementById('time');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

let startTime;
let interval;
let isGameRunning = false;

// Start the game
startBtn.addEventListener('click', () => {
  inputField.value = '';
  inputField.disabled = false;
  inputField.focus();
  isGameRunning = true;
  startTime = new Date();
  startBtn.disabled = true;
  restartBtn.disabled = false;

  // Timer
  interval = setInterval(() => {
    const currentTime = new Date();
    const seconds = ((currentTime - startTime) / 1000).toFixed(2);
    timeDisplay.textContent = seconds;
  }, 100);
});

// Detect typing
inputField.addEventListener('input', () => {
  if (!isGameRunning) return;

  const typedText = inputField.value;
  
  // If sentence is complete
  if (typedText === quoteText) {
    clearInterval(interval);
    isGameRunning = false;
    inputField.disabled = true;

    const timeTaken = (new Date() - startTime) / 1000;
    const wordsTyped = quoteText.split(' ').length;
    const wpm = Math.round((wordsTyped / timeTaken) * 60);
    const accuracy = calculateAccuracy(typedText, quoteText);

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
  }
});

// Restart
restartBtn.addEventListener('click', () => {
  inputField.value = '';
  timeDisplay.textContent = '0.00';
  wpmDisplay.textContent = '0';
  accuracyDisplay.textContent = '0';
  startBtn.disabled = false;
  restartBtn.disabled = true;
  inputField.disabled = true;
  clearInterval(interval);
  isGameRunning = false;
});

// Accuracy function
function calculateAccuracy(typed, original) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === original[i]) correct++;
  }
  return Math.round((correct / original.length) * 100);
}
