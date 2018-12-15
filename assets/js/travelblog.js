var transitionTimer;
var currentHorizontalPosition = 0;
var currentVerticalPosition = 0;
var positionIncrement = 50;
var slideCount = 0;
var totalSlides = 3;
var directionVertical = document.querySelectorAll('.direction-vertical');
var directionHorizontal = document.querySelectorAll('.direction-horizontal');

function initializeTransition() {
    transitionTimer = setInterval(updateTransition, 4000);
}

function updateTransition() {
    slideCount++;
    for(var i = 0; i < directionVertical.length; i++) {
        var verticalElement = directionVertical[i];
        verticalElement.style = 'background-position-y: ' + currentVerticalPosition + '%';
    }

    for(var j = 0; j < directionHorizontal.length; j++) {
        var horizontalElement = directionHorizontal[j];
        horizontalElement.style = 'background-position-x: ' + currentHorizontalPosition + '%';
    }

    currentVerticalPosition += positionIncrement;
    currentHorizontalPosition += positionIncrement;

    if(slideCount >= totalSlides) {
        slideCount = 0;
        currentVerticalPosition = 0;
        currentHorizontalPosition = 0;
    }
}

initializeTransition();