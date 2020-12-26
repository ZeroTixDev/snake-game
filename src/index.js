'use strict';

require('./style.css');
const constants = require('./constants.js');
const Snake = require('./snake.js');
const snake = new Snake();
const canvas = document.createElement('canvas');
canvas.width = constants.GAME_WIDTH;
canvas.height = constants.GAME_HEIGHT;
resize();
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = '30px Arial';
const start = window.performance.now();
let tick = 0;
let startAnim = 0;
let food = makeFood();
document.body.style.backgroundColor = constants.BACKGROUND_COLOR;
window.addEventListener('keydown', trackKeys);
window.addEventListener('keyup', trackKeys);
window.addEventListener('resize', () => {
   resize();
});
let lastTime = 0;
let hue = 160;
function lerp(start, end, time) {
   return start * (1 - time) + end * time;
}
const playerCamera = { x: snake.head.interpPos.x, y: snake.head.interpPos.y };
(function run(time) {
   ctx.fillStyle = 'black';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   drawBackground();
   if (startAnim < 5) {
      ctx.save();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = startAnim / 5;
      ctx.fillStyle = 'white';
      ctx.fillText('WASD TO MOVE', canvas.width / 2, canvas.height / 2 - 400);
      ctx.globalAlpha = 1;
      ctx.restore();
   }
   const delta = (time ? time : 0 - lastTime) / 1000;
   lastTime = time;
   startAnim += delta / 100;
   const expectedTick = Math.ceil(((window.performance.now() - start) * constants.SIMULATION_RATE) / 1000);
   while (tick < expectedTick) {
      snake.update(hue);
      tick++;
   }
   snake.interp(delta);
   checkCollision();
   boundSnake();
   playerCamera.x = snake.head.interpPos.x;
   playerCamera.y = snake.head.interpPos.y;
   drawSnake();
   drawFood();
   drawScore();
   requestAnimationFrame(run);
})();
function drawBackground() {
   const [x, y] = [
      Math.round(0 - playerCamera.x + canvas.width / 2),
      Math.round(0 - playerCamera.y + canvas.height / 2),
   ];
   ctx.strokeStyle = 'white';
   ctx.strokeRect(x, y, 1600, 900);
   /*ctx.strokeStyle = constants.CHECKER_COLOR;
   ctx.lineWidth = 3;
   for (let i = 0; i < canvas.width; i += constants.RESOLUTION * 2) {
      for (let j = 0; j < canvas.height; j += constants.RESOLUTION * 2) {
         ctx.strokeRect(i, j, constants.RESOLUTION, constants.RESOLUTION);
      }
   }*/
}
function drawScore() {
   ctx.fillStyle = 'white';
   ctx.fillText(`${snake.body.length}`, canvas.width / 2, canvas.height - 20);
}
function drawSnake() {
   for (const { interpPos, color } of snake.body) {
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 20;
      ctx.lineWidth = 3;
      const [x, y] = [
         Math.round(interpPos.x - playerCamera.x + canvas.width / 2),
         Math.round(interpPos.y - playerCamera.y + canvas.height / 2),
      ];
      ctx.fillRect(x, y, constants.RESOLUTION, constants.RESOLUTION);
      ctx.strokeRect(x, y, constants.RESOLUTION, constants.RESOLUTION);
   }
}
function boundSnake() {
   if (
      snake.head.interpPos.x >= constants.GAME_WIDTH - constants.RESOLUTION ||
      snake.head.interpPos.x <= 0 ||
      snake.head.interpPos.y >= constants.GAME_HEIGHT - constants.RESOLUTION ||
      snake.head.interpPos.y <= 0
   ) {
      snake.reset();
      food = makeFood();
      hue = 160;
   }
}
function resize() {
   const winw = window.innerWidth;
   const winh = window.innerHeight;
   const xvalue = winw / canvas.width;
   const yvalue = winh / canvas.height;
   const scale = Math.min(xvalue, yvalue);
   canvas.style.transform = 'scale(' + scale + ')';
   canvas.style.left = (winw - canvas.width) / 2 + 'px';
   canvas.style.top = (winh - canvas.height) / 2 + 'px';
}
function trackKeys(event) {
   const { keyCode } = event;
   if (keyCode === 87 && snake.vel.y !== 1) snake.dir(0, -1);
   if (keyCode === 83 && snake.vel.y !== -1) snake.dir(0, 1);
   if (keyCode === 65 && snake.vel.x !== 1) snake.dir(-1, 0);
   if (keyCode === 68 && snake.vel.x !== -1) snake.dir(1, 0);
}
function drawFood() {
   ctx.fillStyle = constants.FOOD_COLOR;
   ctx.strokeStyle = constants.FOOD_COLOR;
   ctx.shadowColor = constants.FOOD_COLOR;
   ctx.lineWidth = 3;
   const [x, y] = [
      Math.round(food.x - playerCamera.x + canvas.width / 2),
      Math.round(food.y - playerCamera.y + canvas.height / 2),
   ];
   ctx.fillRect(x, y, constants.RESOLUTION, constants.RESOLUTION);
   ctx.strokeRect(x, y, constants.RESOLUTION, constants.RESOLUTION);
}
function checkCollision() {
   if (
      snake.head.interpPos.x + constants.RESOLUTION >= food.x &&
      snake.head.interpPos.x <= food.x + constants.RESOLUTION &&
      snake.head.interpPos.y + constants.RESOLUTION >= food.y &&
      snake.head.interpPos.y <= food.y + constants.RESOLUTION
   ) {
      food = makeFood();
      hue += 20;
      hue = hue % 360;
      snake.append(hue);
   }
}
function makeFood() {
   const foodLocations = [];
   for (let x = 0; x < constants.GAME_WIDTH - constants.RESOLUTION; x += constants.RESOLUTION) {
      for (let y = 0; y < constants.GAME_HEIGHT - constants.RESOLUTION; y += constants.RESOLUTION) {
         for (const body of snake.body) {
            if (body.x !== x && body.y !== y) foodLocations.push({ x, y });
         }
      }
   }
   if (foodLocations.length > 0) {
      return foodLocations[Math.floor(Math.random() * foodLocations.length)];
   } else {
      return { x: -1, y: -1 };
   }
}
