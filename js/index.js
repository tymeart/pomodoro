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
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds >= 0 && seconds < 10) {
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
      minutes = breakLength;
      startBreak();
  }
}

function runBreakSession() {
  if (!paused) {
    if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else if (seconds > 0) {
      seconds--;
    }
    updateTimerDisplay();
  }
  if (minutes === 0 && seconds === 0) {
      minutes = workLength;
      startWork();
  }
}

function startWork() {
  clearInterval(timerInterval);
  timerInterval = setInterval(runWorkSession, 1000);
}

function startBreak() {
  clearInterval(timerInterval);
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

// start with 25 minutes and 00 seconds
// set minutes = workLength.toString()
// decrement minutes by 1 when seconds === '00', set seconds to 59
// decrement seconds every 1000ms
// update timer display with interpolated values -> timer.textContent = minutes + ':' + seconds
  // make sure minutes and seconds stay double digits before interpolating
  // if minutes or seconds < 10, add '0' in front


// alert when switching between work and break sessions
