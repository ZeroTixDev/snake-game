'use strict';

const { RESOLUTION } = require('./constants.js');
module.exports = class Snake {
   constructor() {
      this.baseCell = {
         x: 800,
         y: 450,
         lastPos: { x: 800, y: 450 },
         interpPos: { x: 800, y: 450 },
         color: 'hsl(280, 100%, 50%)',
      };
      this.body = [{ ...this.baseCell }];
      this.size = RESOLUTION;
      this.vel = { x: 0, y: 0 };
   }
   get head() {
      return this.body[0];
   }
   append(hue) {
      this.body.push({
         x: this.head.x,
         y: this.head.y,
         lastPos: { x: this.head.x, y: this.head.y },
         interpPos: { x: this.head.x, y: this.head.y },
         color: `hsl(${hue}, 100%, 50%)`,
      });
   }
   dir(x, y) {
      this.vel = { x, y };
   }
   reset() {
      this.body = [{ ...this.baseCell }];
      this.dir(1, 0);
   }
   lerp(start, end, time) {
      return start * (1 - time) + end * time;
   }
   interp(delta) {
      if (delta >= 1 / 20) {
         for (const cell of this.body) {
            cell.interpPos.x = cell.x;
            cell.interpPos.y = cell.y;
         }
      } else {
         const time = delta * 20;
         for (const cell of this.body) {
            cell.interpPos.x = this.lerp(cell.interpPos.x ? cell.interpPos.x : cell.y, cell.x, time);
            cell.interpPos.y = this.lerp(cell.interpPos.y ? cell.interpPos.y : cell.y, cell.y, time);
            //cell.interpPos.x = this.lerp(cell.interpPos.x, cell.x, time);
            //cell.interpPos.y = this.lerp(cell.interpPos.y, cell.y, time);
         }
      }
   }
   update(hue) {
      for (const cell of this.body) {
         cell.lastPos = { x: cell.x, y: cell.y };
      }
      this.head.x = this.head.x + this.vel.x * this.size;
      this.head.y = this.head.y + this.vel.y * this.size;
      for (let i = 1; i < this.body.length; i++) {
         this.body[i].x = this.body[i - 1].lastPos.x;
         this.body[i].y = this.body[i - 1].lastPos.y;
         if (this.body[i].x === this.head.x && this.body[i].y === this.head.y) {
            this.reset();
            hue = 160;
            break;
         }
      }
   }
};
