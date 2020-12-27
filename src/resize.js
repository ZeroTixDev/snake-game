'use strict';
const { CANVAS_WIDTH, CANVAS_HEIGHT } = require('./constants');
module.exports = function resize(canvas) {
   canvas.width = CANVAS_WIDTH;
   canvas.height = CANVAS_HEIGHT;
   const winw = window.innerWidth;
   const winh = window.innerHeight;
   const xvalue = winw / canvas.width;
   const yvalue = winh / canvas.height;
   const scale = Math.min(xvalue, yvalue);
   canvas.style.transform = 'scale(' + scale + ')';
   canvas.style.left = (winw - canvas.width) / 2 + 'px';
   canvas.style.top = (winh - canvas.height) / 2 + 'px';
};
