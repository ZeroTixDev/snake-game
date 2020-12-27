'use strict';

module.exports = class Camera {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
   interp(x, y, delta) {
      this.x += (x - this.x) * delta;
      this.y += (y - this.y) * delta;
   }
   setTo(x, y) {
      this.x = x;
      this.y = y;
   }
};
