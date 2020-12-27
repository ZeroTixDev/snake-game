'use strict';

require('./style.css');
const constants = require('./constants.js');
const Snake = require('./snake.js');
const Camera = require('./camera');
const resize = require('./resize');
const snake = new Snake();
const canvas = document.createElement('canvas');
resize(canvas);
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = '30px Arial';
const start = window.performance.now();
let tick = 0;
let startAnim = 0;
let food = makeFood();
let paused = false;
let startOffset = 0;
const controls = {
   87: 'up',
   83: 'down',
   65: 'left',
   68: 'right',
   38: 'up',
   40: 'down',
   37: 'left',
   39: 'right',
   84: 'hack',
   80: 'pause',
};
document.body.style.backgroundColor = constants.BACKGROUND_COLOR;
window.addEventListener('keydown', trackKeys);
window.addEventListener('keyup', trackKeys);
window.addEventListener('resize', () => {
   resize(canvas);
});
let lastTime = 0;
let hue = 160;
let particles = [];
function makeParticles() {
   particles = [];
   for (let i = 0; i < 100; i++) {
      particles.push({
         x: -1600 + Math.random() * (1600 * 3),
         y: -900 + Math.random() * (900 * 3),
         size: Math.random() * 2 + 1,
      });
   }
}
makeParticles();
const playerCamera = new Camera(800, 800);
(function run(time = 0) {
   if (lastTime === 0 && time !== 0) {
      startOffset = time;
      console.log('start offset', startOffset);
   }
   if (!paused) {
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
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      startAnim += delta;
      const expectedTick = Math.ceil(((window.performance.now() - start) * constants.SIMULATION_RATE) / 1000);
      while (tick < expectedTick) {
         if (snake.update(hue)) {
            food = makeFood();
         }
         tick++;
      }
      snake.interp(delta);
      checkCollision();
      boundSnake();
      if (snake.deadTick > 0) {
         canvas.style.filter = 'grayscale(1) blur(5px)';
      } else {
         if (canvas.style.filter !== 'none') {
            canvas.style.filter = 'none';
         }
      }
      if (delta >= 1) {
         playerCamera.setTo(snake.head.x, snake.head.y);
      } else {
         playerCamera.interp(snake.head.x, snake.head.y, delta);
      }
      drawParticles();
      drawSnake();
      drawFood();
      drawScore();
   }
   requestAnimationFrame(run);
})();
function offset(x, y) {
   return {
      x: Math.round(x - playerCamera.x + canvas.width / 2),
      y: Math.round(y - playerCamera.y + canvas.height / 2),
   };
}
function drawParticles() {
   ctx.fillStyle = 'white';
   for (const particle of particles) {
      const { x, y } = offset(particle.x, particle.y);
      ctx.beginPath();
      ctx.arc(x, y, particle.size, 0, Math.PI * 2);
      ctx.fill();
   }
}
function drawBackground() {
   {
      const { x, y } = offset(0, 0);
      ctx.strokeStyle = 'white';
      ctx.strokeRect(x, y, 1600, 900);
   }
   {
      const { x, y } = offset(1575, 950);
      ctx.fillStyle = 'white';
      ctx.fillText('by ZeroTix', x, y);
   }
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
      ctx.lineWidth = 3;
      const { x, y } = offset(interpPos.x, interpPos.y);
      ctx.fillRect(x, y, constants.RESOLUTION, constants.RESOLUTION);
      ctx.strokeRect(x, y, constants.RESOLUTION, constants.RESOLUTION);
   }
}
function boundSnake() {
   if (
      snake.deadTick === 0 &&
      (snake.head.interpPos.x >= constants.GAME_WIDTH - constants.RESOLUTION ||
         snake.head.interpPos.x <= 0 ||
         snake.head.interpPos.y >= constants.GAME_HEIGHT - constants.RESOLUTION ||
         snake.head.interpPos.y <= 0)
   ) {
      snake.deadTick = 1;
   }
}
function trackKeys(event) {
   const { keyCode } = event;
   if (controls[keyCode] === 'up' && snake.vel.y !== 1) snake.dir(0, -1);
   if (controls[keyCode] === 'down' && snake.vel.y !== -1) snake.dir(0, 1);
   if (controls[keyCode] === 'left' && snake.vel.x !== 1) snake.dir(-1, 0);
   if (controls[keyCode] === 'right' && snake.vel.x !== -1) snake.dir(1, 0);
   if (controls[keyCode] === 'hack' && event.type === 'keydown') {
      for (let i = 0; i < 10; i++) {
         addToSnake(hue);
      }
   }
   if (controls[keyCode] === 'pause' && event.type !== 'keyup') {
      paused = !paused;
      if (paused) {
         ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
         ctx.fillRect(0, 0, canvas.width, canvas.height);
         ctx.fillStyle = 'white';
         ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
      } else {
         const expectedTick = Math.ceil(((window.performance.now() - start) * constants.SIMULATION_RATE) / 1000);
         tick = expectedTick;
         lastTime = window.performance.now() + startOffset;
      }
   }
}
function drawFood() {
   ctx.fillStyle = constants.FOOD_COLOR;
   ctx.strokeStyle = constants.FOOD_COLOR;
   ctx.lineWidth = 3;
   const { x, y } = offset(food.x, food.y);
   ctx.fillRect(x, y, constants.RESOLUTION, constants.RESOLUTION);
   ctx.strokeRect(x, y, constants.RESOLUTION, constants.RESOLUTION);
}
function addToSnake(hue) {
   snake.append(hue);
}
function checkCollision() {
   if (
      snake.head.interpPos.x + constants.RESOLUTION >= food.x &&
      snake.head.interpPos.x <= food.x + constants.RESOLUTION &&
      snake.head.interpPos.y + constants.RESOLUTION >= food.y &&
      snake.head.interpPos.y <= food.y + constants.RESOLUTION
   ) {
      food = makeFood();
      hueUpdate();
      addToSnake(hue);
   }
}
function hueUpdate() {
   hue += 20;
   hue = hue % 360;
}
function findEmptySpots() {
   const spots = [];
   for (let x = 0; x < constants.GAME_WIDTH - constants.RESOLUTION; x += constants.RESOLUTION) {
      for (let y = 0; y < constants.GAME_HEIGHT - constants.RESOLUTION; y += constants.RESOLUTION) {
         for (const body of snake.body) {
            if (body.x !== x && body.y !== y) spots.push({ x, y });
         }
      }
   }
   return spots;
}
function makeFood() {
   const foodLocations = findEmptySpots();
   if (foodLocations.length > 0) {
      return foodLocations[Math.floor(Math.random() * foodLocations.length)];
   } else {
      return { x: -1, y: -1 };
   }
}
