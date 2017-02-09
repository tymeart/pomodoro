var workLength = 25;
var breakLength = 5;

var adjustmentButtons = document.querySelectorAll('.buttons button');
var startButton = document.getElementById('start');
var adjustableWorkLength = document.querySelector('.session-length .minutes');
var adjustableBreakLength = document.querySelector('.break-length .minutes');
var timer = document.getElementById('timer');

adjustmentButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var intervalCategory = this.id;

    if (intervalCategory === 'work-plus') {
      workLength++;
      adjustableWorkLength.textContent = workLength;
      timer.textContent = workLength + ':00';
    } else if (intervalCategory === 'work-minus' && workLength > 1) {
      workLength--;
      adjustableWorkLength.textContent = workLength;
      timer.textContent = workLength + ':00';
    } else if (intervalCategory === 'break-plus') {
      breakLength++;
      adjustableBreakLength.textContent = breakLength;
    } else if (intervalCategory === 'break-minus' && breakLength > 1) {
      breakLength--;
      adjustableBreakLength.textContent = breakLength;
    }
  });
});

var paused = true;
var timerInterval;
var minutes = 25;
var seconds = 0;

function updateTimerDisplay() {
  if (minutes[0] !== '0' && minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds[0] !== '0' && seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = minutes + ':' + seconds;
}

function runWorkSession() {
  if (!paused) {
    if (seconds === 0 || seconds === '00') {
      minutes--;
      seconds = 59;
    } else if (seconds > 0){
      seconds--;
    }
    updateTimerDisplay();
  }
  if (minutes === 0 && seconds === 0) {
      startBreak();
  }
}

function runBreakSession() {
  if (!paused) {
    if (seconds === 0 || seconds === '00') {
      minutes--;
      seconds = 59;
    } else if (seconds > 0) {
      seconds--;
    }
    updateTimerDisplay();
  }
  if (minutes === 0 && seconds === 0) {
      startWork();
  }
}

function startWork() {
  clearInterval(timerInterval);
  minutes = workLength;
  timerInterval = setInterval(runWorkSession, 1000);
}

function startBreak() {
  clearInterval(timerInterval);
  minutes = breakLength;
  timerInterval = setInterval(runBreakSession, 1000);
}

startButton.addEventListener('click', function() {
  startWork();

  if (this.textContent === 'Start') {
    this.textContent = 'Pause';
    paused = false;
  } else {
    this.textContent = 'Start';
    paused = true;
  }

}
);

// add 0 in front of minutes < 10 in timer display before timer starts
// alert when switching between work and break sessions
