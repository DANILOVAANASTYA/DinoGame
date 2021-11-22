import { CANVAS_SIZE, DINO_START_COORDINATES } from "../const.js";
import Dino from "./Dino.js";

/**
 * Game board
 */
export default class Game {
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
  }
}
