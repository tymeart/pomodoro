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
      minutes = workLength;
      seconds = 0;
      updateTimerDisplay();
      onBreak = false;
    } else if (intervalCategory === 'work-minus' && workLength > 1) {
      workLength--;
      adjustableWorkLength.textContent = workLength;
      minutes = workLength;
      seconds = 0;
      updateTimerDisplay();
      onBreak = false;
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
var onBreak = false;
var timerInterval;
var minutes = 25;
var seconds = 0;

function updateTimerDisplay() {
  var str = '';
  if (minutes[0] !== '0' && minutes < 10) {
    str = '0' + minutes + ':';
  } else {
    str = minutes + ':';
  }
  if (seconds[0] !== '0' && seconds < 10) {
    str += '0' + seconds;
  } else {
    str += seconds;
  }
  timer.textContent = str;
}

function runSession() {
  if (!paused) {
    if (minutes === 0 && seconds === 0) {
        if (onBreak) {
          startWork();
        } else {
          startBreak();
      }
    } else if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else if (seconds > 0){
      seconds--;
    }
    updateTimerDisplay();
  }
  if (minutes === '00' && seconds === '00') {
      updateTimerDisplay();
      setTimeout(startBreak, 1000);
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
  if (minutes === '00' && seconds === '00') {
      updateTimerDisplay();
      setTimeout(startWork, 1000);
  }
}

function startWork() {
  clearInterval(timerInterval);
  minutes = workLength;
  seconds = 0;
  updateTimerDisplay();
  timerInterval = setInterval(runWorkSession, 1000);
}

function startBreak() {
  clearInterval(timerInterval);
  minutes = breakLength;
  seconds = 0;
  updateTimerDisplay();
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
// clicking pause resets timer?!
// alert when switching between work and break sessions
