
/*
Set up the canvas    
*/
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


/*
Global Variables
*/

// Position of the last click
var clickX = 0;
var clickY = 0;

// Offset within an object of our grab point
var dragOffsetX = 0;
var dragOffsetY = 0;
var dragging = false; // Is a drag in progress?
var dragBall = null;


/*
Mouse routines
*/

// Set up some globals, mx and my, that always contain the mouse location within the canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

var mx = 0;
var my = 0;
var mouseDown = false;
var mouseChangeState = false;

canvas.addEventListener('mousedown', function (evt) {
    mxStart = mx;
    myStart = my;
    mouseDown = true;
    mouseChangeState = true;
}, false);
canvas.addEventListener('mouseup', function (evt) {
    mxEnd = mx;
    myEnd = my;
    mouseDown = false;
    mouseChangeState = true;
}, false);

canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    mx = mousePos.x;
    my = mousePos.y;
}, false);

/*
Ball Object
*/

class Ball {
    constructor(x,y,r,c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.colour = c;
        this.outline = false;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour;
        ctx.fill();     
        if (this.outline) {
            ctx.lineWidth = 10;
            ctx.strokeStyle = "green";
            ctx.stroke();
        }   
    }

    hit(x,y) {
        return ((this.x - x) * (this.x - x) + (this.y-y)*(this.y-y)) < this.r*this.r;
    }
}

/*
Main Loop   
*/

var ball1 = new Ball(200,100,30,"white");
var ball3 = new Ball(20,20,10,"red");
var ball2 = new Ball(100,250,20,"blue");

var balls = [ball1, ball2, ball3];

function animate() {
    // clear the background
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    // Draw the balls
    balls.forEach(function (b) {
        b.draw();
    });

    // The left mouse button is held down
    if (mouseDown == true) {
        if (mouseChangeState == true) { // The mouse button has just been pressed
            mouseChangeState = false;   // Reset the "just pressed" flag
            clickX = mx;                // Record the co-ordinates of the click
            clickY = my;

            // Find out if we clicked on a ball
            balls.forEach(function (b) {
                if (b.hit(mx,my)) {
                    // Record which ball it was and get the offset from the clickpoint
                    dragOffsetX = mx - b.x;
                    dragOffsetY = my - b.y;
                    dragBall = b;
                }
            });
            // We're not dragging yet
            dragging = false;
        } else {
            // Drag event
            // The mouse is still down and not where it was.
            if (dragBall && (mx != clickX || my != clickY)) {
                dragging = true; // Now it's a drag
                dragBall.x = mx - dragOffsetX;
                dragBall.y = my - dragOffsetY;
            }
        }
    } else {
        if (mouseChangeState == true) {
            mouseChangeState = false;

            if (dragging) {
                dragging = false;
                console.log("end drag");
                // end drag
            }
            else if (dragBall && mx == clickX && my == clickY) {
                // didn't move, so click
                console.log("click");
                dragBall.outline = !dragBall.outline;
            }

            dragBall = null;

        }
    }

    // Next frame
    requestAnimationFrame(animate);
}


animate();
