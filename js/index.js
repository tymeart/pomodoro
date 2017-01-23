var workLength = 25;
var breakLength = 5;
var timer = 25;

var adjustmentButtons = document.querySelectorAll('.buttons button');
var startStopButton = document.getElementById('start-stop');
var workLengthMinutes = document.querySelector('.session-length .minutes');
var breakLengthMinutes = document.querySelector('.break-length .minutes');

adjustmentButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var intervalCategory = this.id;

    // minutes have to > 0 though...
    if (intervalCategory === 'work-plus') {
      workLength++;
      workLengthMinutes.innerText = workLength;
    } else if (intervalCategory === 'work-minus' && workLength > 1) {
      workLength--;
      workLengthMinutes.innerText = workLength;
    } else if (intervalCategory === 'break-plus') {
      breakLength++;
      breakLengthMinutes.innerText = breakLength;
    } else if (intervalCategory === 'break-minus' && breakLength > 1) {
      breakLength--;
      breakLengthMinutes.innerText = breakLength;
    }
  });
});
