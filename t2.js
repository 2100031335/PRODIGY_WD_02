let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startStopButton.addEventListener('click', () => {
    if (running) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000);
        startStopButton.textContent = 'Stop';
    }
    running = !running;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    lapTimes = [];
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    lapsContainer.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (running) {
        const lapTime = elapsedTime;
        lapTimes.push(lapTime);
        displayLapTimes();
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function displayLapTimes() {
    lapsContainer.innerHTML = '';
    lapTimes.forEach((lapTime, index) => {
        const totalSeconds = Math.floor(lapTime / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${index + 1}: ${hours}:${minutes}:${seconds}`;
        lapsContainer.appendChild(lapElement);
    });
}
