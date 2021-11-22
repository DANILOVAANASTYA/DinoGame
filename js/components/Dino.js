import {
  CANVAS_SIZE,
  DINO_COLOR,
  DINO_SIZE,
  START_JUMP_POSITION
} from "../const.js";
import { getCurrentJumpSpeed } from "../lib.js"

/**
 * Player
 */
export default class Dino {
  constructor(ctx, startPosX, startPosY) {
    this._ctx = ctx;
    this.jump = this.jump.bind(this);
    this.jumpHandler = this.jumpHandler.bind(this);
    this.position = [startPosX, startPosY];
    this._jumpStart = null;
    this._setHandlers();
  }

  jumpHandler() {
    window.requestAnimationFrame(this.jump);
  }

  draw() {
    this._ctx.beginPath();
    this._ctx.rect(
      this.position[0],
      CANVAS_SIZE.HEIGHT - DINO_SIZE.HEIGHT - this.position[1],
      DINO_SIZE.WIDTH,
      DINO_SIZE.HEIGHT
    );
    this._ctx.fillStyle = DINO_COLOR;
    this._ctx.fill();
    this._ctx.closePath();
  }

  jump(timestamp) {
    if (!this._jumpStart) this._jumpStart = timestamp;
    const progress = timestamp - this._jumpStart;
    this._ctx.clearRect(0, 0, ...Object.values(CANVAS_SIZE));
    this.position[1] += getCurrentJumpSpeed(progress);
    this.draw();

    this.jumpAnimation = requestAnimationFrame(this.jump);

    if (this.position[1] <= START_JUMP_POSITION) {
      this._jumpStart = null;
      cancelAnimationFrame(this.jumpAnimation);
    }
  }

  _setHandlers() {
    this._ctx.canvas.addEventListener("touchstart", this.jumpHandler);
    this._ctx.canvas.addEventListener("mousedown", this.jumpHandler);
  }
}
