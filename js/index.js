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

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var startAngle = -Math.PI/2;
var endAngle = Math.PI*2;
var currentEndAngle;
var startTime = new Date().getTime();
var timeDifference;

context.lineWidth = 10;
context.strokeStyle = '#fff';

function draw() {
    if (paused) {
      startTime = new Date().getTime();
    }

    if (!paused) {
      timeDifference = new Date().getTime() - startTime;
      timeDifference /= 60000;
      currentEndAngle = startAngle + endAngle * timeDifference;

      context.beginPath();
      context.arc(canvas.width/2, canvas.height/2, 110, startAngle, currentEndAngle);
      context.stroke();

      if (timeDifference >= 1) {
        startTime = new Date().getTime();
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
}

var paused = true;
var timerInterval;

function updateWorkDisplay() {
  if (!paused) {
    timer.textContent = workLength;
    workLength--;
  }
  if (workLength < 0) {
      workLength = adjustableWorkLength.textContent;
      startBreak();
  }
}

function updateBreakDisplay() {
  if (!paused) {
    timer.textContent = breakLength;
    breakLength--;
  }
  if (breakLength < 0) {
      breakLength = adjustableBreakLength.textContent;
      startWork();
  }
}

function startWork() {
  clearInterval(timerInterval);
  timerInterval = setInterval(updateWorkDisplay, 60000);
}

function startBreak() {
  clearInterval(timerInterval);
  timerInterval = setInterval(updateBreakDisplay, 60000);
}

startButton.addEventListener('click', function() {
  setTimeout(function(){
    workLength--;
    timer.textContent = workLength;
  }, 60000);
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
var minutes = '25';
var seconds = '00';
// set minutes = workLength.toString()
// decrement minutes by 1 when seconds === '00', set seconds to 59
// decrement seconds every 1000ms
// update timer display with interpolated values -> timer.textContent = minutes + ':' + seconds
  // make sure minutes and seconds stay double digits before interpolating
  // if minutes or seconds < 10, add '0' in front


// alert when switching between work and break sessions
