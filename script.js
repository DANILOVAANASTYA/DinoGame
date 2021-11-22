//alert("Hello, World!");
const DINO_COLOR = "#FF0000";
const DINO_SIZE = {
  WIDTH: 20,
  HEIGHT: 50
}
const DINO_START_COORDINATES = [10, 10];
const JUMP_HEIGHT = 200;
const START_JUMP_STEP = 10;
const CANVAS_SIZE = {
  WIDTH: 370, HEIGHT: 300
};


class Dino {
  constructor(ctx, startPosX, startPosY) {
	this._ctx = ctx;
    this.jump = this.jump.bind(this);
    this.position = [startPosX, startPosY];
    //this._isGoingUp = false;
    //this._isGoingDown = false;
    this.isJumping = false;
    this.jumpSpeed = 5;
    this.fallSpeed = 5;
    this._jumpStep = 0;
    this._setHandlers();
  }

  jumpUp () {
    this._jumpStep++;
    this._ctx.clearRect(0,0,...Object.values(CANVAS_SIZE));
    this.isJumping = true;
    this.position[1] += this.jumpSpeed / (.1 * this._jumpStep);
    this.draw();
    this.jumpAnimationUp = requestAnimationFrame(this.jumpUp.bind(this)); // bind jumpUp to request animation frame
    if (this.position[1] > JUMP_HEIGHT) {
      // player is playerHeight + jumpHeight
      this._jumpStep = 0;
      cancelAnimationFrame(this.jumpAnimationUp);
      this.jumpDown();
    }
  }

  jumpDown () {
    //alert("down");
     this._ctx.clearRect(0,0,...Object.values(CANVAS_SIZE));
    this.position[1] -= this.fallSpeed;
    this.draw();
    this.jumpAnimationDown = requestAnimationFrame(this.jumpDown.bind(this)) // bind jumpDown to request animation frame

    if (this.position[1] < 0) {
      // player is bottom of canvas
      this.isJumping = false
      cancelAnimationFrame(this.jumpAnimationDown)
    }
  }


  draw() {
    this._ctx.beginPath();
	this._ctx.rect(this.position[0], CANVAS_SIZE.HEIGHT - DINO_SIZE.HEIGHT - this.position[1], DINO_SIZE.WIDTH, DINO_SIZE.HEIGHT);
	this._ctx.fillStyle = DINO_COLOR;
	this._ctx.fill();
	this._ctx.closePath();
  }
  
  jump() {
    this._jumpStep = 0;
    this.jumpUp();
  }
  
  
  _setHandlers() {
    this._ctx.canvas.addEventListener("touchstart", this.jump);
    //this._ctx.canvas.addEventListener("click", this.jump)
  }
}

class DinoGame {
  constructor() {
  	this.canvas = document.getElementById("app");
	this.ctx = this.canvas.getContext("2d");
    this._dino = null;
  }

  _drawDino() {
    this._dino = new Dino(this.ctx, ...DINO_START_COORDINATES);
    this._dino.draw();
  }

  _setCanvasSize() {
	this.canvas.width = CANVAS_SIZE.WIDTH;
    this.canvas.height = CANVAS_SIZE.HEIGHT;
  }

  
  
  init() {
    this._setCanvasSize();
    this._drawDino();
   // this._dino.jump();
    //window.requestAnimationFrame(() => this._dino.jump(10));
  }
}

new DinoGame().init();