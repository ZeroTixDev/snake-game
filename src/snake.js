'use strict';

const { RESOLUTION, SIMULATION_RATE } = require('./constants.js');
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
      this.deadTick = 0;
      this.deadTicks = SIMULATION_RATE * 1; // 0.1 seconds is the amount of time you are frozen; ( i think )
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
      this.dir(0, 0);
   }
   lerp(start, end, time) {
      return start * (1 - time) + end * time;
   }
   interp(delta) {
      if (delta >= 1 / (SIMULATION_RATE + 5)) {
         for (const cell of this.body) {
            cell.interpPos.x = cell.x;
            cell.interpPos.y = cell.y;
         }
      } else {
         const time = delta * (SIMULATION_RATE + 5);
         for (const cell of this.body) {
            cell.interpPos.x = this.lerp(cell.interpPos.x, cell.x, time);
            cell.interpPos.y = this.lerp(cell.interpPos.y, cell.y, time);
            //cell.interpPos.x = this.lerp(cell.interpPos.x, cell.x, time);
            //cell.interpPos.y = this.lerp(cell.interpPos.y, cell.y, time);
         }
      }
   }
   update(hue) {
      for (const cell of this.body) {
         cell.lastPos = { x: cell.x, y: cell.y };
      }
      this.head.x += this.vel.x * this.size;
      this.head.y += this.vel.y * this.size;
      if (this.deadTick === 0) {
         for (let i = 1; i < this.body.length; i++) {
            const old = { ...this.body[i] };
            this.body[i].x = this.body[i - 1].lastPos.x;
            this.body[i].y = this.body[i - 1].lastPos.y;
            if (this.body[i].x === this.head.x && this.body[i].y === this.head.y) {
               this.deadTick = 1;
               this.body[i] = old;
               break;
            }
            this.body[i] = old;
         }
      }
      if (this.deadTick >= 1) {
         this.head.x -= this.vel.x * this.size;
         this.head.y -= this.vel.y * this.size;
         this.deadTick++;
         if (this.deadTick >= this.deadTicks) {
            this.reset();
            hue = 160;
            this.deadTick = 0;
            return true;
         }
      } else {
         for (let i = 1; i < this.body.length; i++) {
            this.body[i].x = this.body[i - 1].lastPos.x;
            this.body[i].y = this.body[i - 1].lastPos.y;
         }
      }
      return false;
   }
};
