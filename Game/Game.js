
const BALL_DEFAULT_POSITION_X = 250;
const BALL_DEFAULT_POSITION_Y = 50;
const BALL_DEFAULT_RADIUS = 10;
const BALL_DEFAULT_SPEED = 5;

const BAR_DEFAULT_POSITION_X = 250;
const BAR_DEFAULT_POSITION_Y = 550;
const BAR_DEFAULT_WIDTH = 100;
const BAR_DEFAULT_HEIGHT = 5;
const BAR_DEFAULT_SPEED = 50;
const MAPWIDTH = document.getElementById("canvas").offsetWidth;
const MAPHEIGHT = document.getElementById("canvas").offsetHeight;
const CTX = document.getElementById("canvas").getContext("2d");

let Ball = function () {
    this.x = BALL_DEFAULT_POSITION_X;
    this.y = BALL_DEFAULT_POSITION_Y;
    this.radius = BALL_DEFAULT_RADIUS;
    this.speedX = BALL_DEFAULT_SPEED;
    this.speedY = BALL_DEFAULT_SPEED;
    this.drawBall = function () {
        CTX.beginPath();
        CTX.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        CTX.fillStyle = "#7c747b";
        CTX.fill();
    };
    this.moveBall = function () {
        this.x +=this.speedX;
        this.y +=this.speedY;
        this.left = this.x - this.radius;
        this.top = this.y - this.radius;
        this.right = this.x + this.radius;
        this.bottom = this.y + this.radius;
    };
    this.check = function (bar) {
        let isBar =  ((this.bottom>=bar.getY() && this.top < bar.getY()+bar.height)&&(this.right>bar.getX()&&this.left<(bar.getX()+bar.width)));
        let isLeft = this.left <= 0;
        let isRight = this.right >= MAPWIDTH;
        let isTop = this.top <= 0;
        let isBot = this.bottom >= MAPHEIGHT;
        if (isTop){
            this.speedY = -this.speedY;
        }
        if(isBar){
            this.speedY = -this.speedY;
            score++;
            if(score%5===0&&score>=5){
                if(this.speedY<0){
                    this.speedY-=2;
                }else {
                    this.speedY+=2;
                }
            }
        }
        if (isLeft || isRight){
            this.speedX  = -this.speedX;
        }
        if(isBot){
            score = 0;
            alert("You Lose");
            this.x = BALL_DEFAULT_POSITION_X;
            this.y = BALL_DEFAULT_POSITION_Y;
            this.speedY = BALL_DEFAULT_SPEED;
        }
    };
    this.drawScore = function () {
        CTX.font = "25px Arial";
        CTX.fillStyle = "#dddb00";
        CTX.fillText("Score: " +  score, 8, 20);
    }
    };
    let Bar = function () {
    this.x = BAR_DEFAULT_POSITION_X;
    this.y = BAR_DEFAULT_POSITION_Y;
    this.height =  BAR_DEFAULT_HEIGHT;
    this.width = BAR_DEFAULT_WIDTH;
    this.drawBar = function () {
        CTX.fillStyle = "#2171f2";
        CTX.fillRect(this.x, this.y, this.width, this.height);
    };
    this.moveLeft = function () {
        if (this.x>0){
            this.x -= BAR_DEFAULT_SPEED;
        };
        this.drawBar(CTX);
    };
    this.moveRight = function () {
        if (this.x <600+this.width){
            this.x += BAR_DEFAULT_SPEED;
        };
        this.drawBar(CTX);
    };
    this.getX = function () {
        return this.x;
    };
    this.getY = function () {
        return this.y;
    };
        this.getHeight = function () {
            return this.height;
        };
        this.getWidth = function () {
            return this.width;
            };
    this.clearBar = function () {
        CTX.clearRect(0,0,800,600);

    }
    };
    function moveBar(event) {
    switch (event.keyCode) {
        case 37: {
            bar.moveLeft();
            break;
        }
        case 39: {
            bar.moveRight();
            break;
        }
    }
    bar.clearBar();
    bar.drawBar();
    }
    function run() {
    window.addEventListener('keydown',moveBar);
}