var workLength = 25;
var breakLength = 5;

var adjustmentButtons = document.querySelectorAll('.buttons button');
var startButton = document.getElementById('start');
var workLengthMinutes = document.querySelector('.session-length .minutes');
var breakLengthMinutes = document.querySelector('.break-length .minutes');
var timer = document.getElementById('timer');

adjustmentButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var intervalCategory = this.id;

    if (intervalCategory === 'work-plus') {
      workLength++;
      workLengthMinutes.textContent = workLength;
      timer.textContent = workLength;
    } else if (intervalCategory === 'work-minus' && workLength > 1) {
      workLength--;
      workLengthMinutes.textContent = workLength;
      timer.textContent = workLength;
    } else if (intervalCategory === 'break-plus') {
      breakLength++;
      breakLengthMinutes.textContent = breakLength;
    } else if (intervalCategory === 'break-minus' && breakLength > 1) {
      breakLength--;
      breakLengthMinutes.textContent = breakLength;
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

function updateDisplay(sessionType) {
  if (!paused) {
    timer.textContent = sessionType;
    sessionType--;
  }
  if (sessionType < 0) {
    sessionType = `${sessionType}Minutes.textContent`;
    if (sessionType === workLength) {
      startBreak();
    } else if (sessionType === breakLength) {
      startWork();
    }
  }
}

// write function that creates the interval so you can pass parameters into the callback

function startWork() {
  clearInterval(timerInterval);
  timerInterval = setInterval(updateDisplay, 1000);
}

function startBreak() {
  clearInterval(timerInterval);
  timerInterval = setInterval(updateDisplay, 1000);
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
