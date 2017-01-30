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

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var context = canvas.getContext('2d');
    // refer to Drawing shapes with canvas on MDN
    // x, y, radius, startAngle, endAngle
    context.arc(110, 110, 110, 0, (Math.PI/180)*3);
    context.stroke();
  }
}

var paused = true;
var intervalID;
function startWork() {
  clearInterval(intervalID);
  intervalID = setInterval(function() {
    if (!paused) {
      timer.textContent = workLength;
      workLength--;
    }
    if (workLength < 0) {
      workLength = workLengthMinutes.textContent;
      startBreak();
    }
  }, 1000);
}

function startBreak() {
  clearInterval(intervalID);
  intervalID = setInterval(function() {
    if (!paused) {
      timer.textContent = breakLength;
      breakLength--;
    }
    if (breakLength < 0) {
      breakLength = breakLengthMinutes.textContent;
      startWork();
    }
  }, 1000);
}

startButton.addEventListener('click', function() {
  draw();
  // startWork();

  if (this.textContent === 'Start') {
    this.textContent = 'Pause';
    paused = false;
  } else {
    this.textContent = 'Start';
    paused = true;
  }

  }
);
