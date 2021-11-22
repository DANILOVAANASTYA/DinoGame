import { G, START_JUMP_SPEED } from "./const.js";

/**
 * Returns jump speed by time
 * v = V(start speed) - G(gravitational acceleration) * t (time)
 * @param {number} timeMs - time from animation start
 * @return {number}
 */
export const getCurrentJumpSpeed = timeMs =>
  START_JUMP_SPEED - G * (timeMs / 1000);
