var canvas = document.getElementById("bgCanvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
var context = canvas.getContext("2d");
var particleCount = 4;
var particleCollection = [];

var Util = {
    randomFromRange: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomColor: function() {
        var colorArr = ['#201E50', '#525B76', '#CC2936', '#E9D758', '#39466B', '#993E5B', '#1B3022'];
        return colorArr[this.randomFromRange(0, colorArr.length - 1)];
    }
}

var particleSystem = function(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.directionX = Util.randomFromRange(-5, 5);
    this.directionY = Util.randomFromRange(-5, 5);
    this.draw = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.globalAlpha = 0.1;
        context.fill();
        context.closePath();
    }
}

particleSystem.prototype.update = function() {
    this.draw();
    
    if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0 ) {
        this.directionX = -this.directionX;
    }

    if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
        this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;
}

function initialize() {
    for(var i=0; i < particleCount; i++) {
        var radius = Util.randomFromRange(32, 48);
        var particle = new particleSystem(Util.randomFromRange(2 * radius, canvas.width - (2 * radius)), Util.randomFromRange(2 * radius, canvas.height - (2 * radius)), radius, Util.randomColor());
        particle.draw();
        particleCollection.push(particle);
    }
}

function animate(timer) {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < particleCollection.length; i++) {
        var particle = particleCollection[i];
        particle.update();
    }
}

if(innerWidth >= 768) {
    initialize();
    animate();
}