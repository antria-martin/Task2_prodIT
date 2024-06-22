// Getting necessary DOM elements
const timeDisplay = document.querySelector('.StopWatch p');
const startButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');
const lapButton = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

let startTime;
let elapsedTime = 0;
let timerInterval;

// Function to start the stopwatch
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startButton.style.display = 'none';
    pauseButton.style.display = 'block';
}

// Function to pause the stopwatch
function pauseTimer() {
    clearInterval(timerInterval);
    startButton.style.display = 'block';
    pauseButton.style.display = 'none';
}

// Function to reset the stopwatch
function resetTimer() {
    clearInterval(timerInterval);
    timeDisplay.innerHTML = '00:00:00';
    lapsList.innerHTML = ''; // Clear laps list
    elapsedTime = 0;
    startButton.style.display = 'block';
    pauseButton.style.display = 'none';
    
}

// Function to update the displayed time
function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    timeDisplay.textContent = formattedTime;
}

// Function to format time in HH:MM:SS format
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10); // Calculate milliseconds
    return `${pad(minutes)}:${pad(seconds)}:${pad(ms)}`;
}

// Function to pad single digit numbers with a leading zero
function pad(number) {
    return number < 10 ? '0' + number : number;
}

// Function to handle lap button click
function lap() {
    const formattedTime = timeDisplay.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = formattedTime;
    lapsList.appendChild(lapItem);
}

// Event listeners for buttons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lap);