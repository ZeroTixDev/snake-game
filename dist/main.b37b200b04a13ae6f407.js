(()=>{"use strict";var e={426:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(645),o=n.n(i)()((function(e){return e[1]}));o.push([e.id,"* {\r\n\tmargin:0;\r\n\tpadding:0;\r\n\tbox-sizing: border-box;\r\n}\r\nbody {\r\n\tfont-size:16px;\r\n\tbackground:black;\r\n\toverflow: hidden;\r\n}\r\ncanvas {\r\n\tposition: absolute;\r\n\ttransition: all 0.2s linear;\r\n}",""]);const r=o},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(i)for(var r=0;r<this.length;r++){var s=this[r][0];null!=s&&(o[s]=!0)}for(var a=0;a<e.length;a++){var l=[].concat(e[a]);i&&o[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},654:(e,t,n)=>{n.r(t),n.d(t,{default:()=>s});var i=n(379),o=n.n(i),r=n(426);o()(r.Z,{insert:"head",singleton:!1});const s=r.Z.locals||{}},379:(e,t,n)=>{var i,o=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),r=[];function s(e){for(var t=-1,n=0;n<r.length;n++)if(r[n].identifier===e){t=n;break}return t}function a(e,t){for(var n={},i=[],o=0;o<e.length;o++){var a=e[o],l=t.base?a[0]+t.base:a[0],d=n[l]||0,h="".concat(l," ").concat(d);n[l]=d+1;var c=s(h),f={css:a[1],media:a[2],sourceMap:a[3]};-1!==c?(r[c].references++,r[c].updater(f)):r.push({identifier:h,updater:p(f,t),references:1}),i.push(h)}return i}function l(e){var t=document.createElement("style"),i=e.attributes||{};if(void 0===i.nonce){var r=n.nc;r&&(i.nonce=r)}if(Object.keys(i).forEach((function(e){t.setAttribute(e,i[e])})),"function"==typeof e.insert)e.insert(t);else{var s=o(e.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(t)}return t}var d,h=(d=[],function(e,t){return d[e]=t,d.filter(Boolean).join("\n")});function c(e,t,n,i){var o=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(e.styleSheet)e.styleSheet.cssText=h(t,o);else{var r=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function f(e,t,n){var i=n.css,o=n.media,r=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var y=null,u=0;function p(e,t){var n,i,o;if(t.singleton){var r=u++;n=y||(y=l(t)),i=c.bind(null,n,r,!1),o=c.bind(null,n,r,!0)}else n=l(t),i=f.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i));var n=a(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var i=0;i<n.length;i++){var o=s(n[i]);r[o].references--}for(var l=a(e,t),d=0;d<n.length;d++){var h=s(n[d]);0===r[h].references&&(r[h].updater(),r.splice(h,1))}n=l}}}},468:e=>{e.exports=class{constructor(e,t){this.x=e,this.y=t}interp(e,t,n){this.x+=(e-this.x)*n,this.y+=(t-this.y)*n}setTo(e,t){this.x=e,this.y=t}}},279:e=>{e.exports={CHECKER_COLOR:"white",BACKGROUND_COLOR:"black",SNAKE_COLOR:"#26ff00",GAME_HEIGHT:900,GAME_WIDTH:1600,SIMULATION_RATE:20,FOOD_COLOR:"#ff8800",RESOLUTION:40,ULTRA_FOOD_COLOR:"#00fff7",CANVAS_WIDTH:1600,CANVAS_HEIGHT:900}},349:(e,t,n)=>{const{CANVAS_WIDTH:i,CANVAS_HEIGHT:o}=n(279);e.exports=function(e){e.width=i,e.height=o;const t=window.innerWidth,n=window.innerHeight,r=t/e.width,s=n/e.height,a=Math.min(r,s);e.style.transform="scale("+a+")",e.style.left=(t-e.width)/2+"px",e.style.top=(n-e.height)/2+"px"}},40:(e,t,n)=>{const{RESOLUTION:i,SIMULATION_RATE:o}=n(279);e.exports=class{constructor(){this.baseCell={x:800,y:450,lastPos:{x:800,y:450},interpPos:{x:800,y:450},color:"hsl(280, 100%, 50%)"},this.body=[{...this.baseCell}],this.size=i,this.vel={x:0,y:0},this.deadTick=0,this.deadTicks=1*o}get head(){return this.body[0]}append(e){this.body.push({x:this.head.x,y:this.head.y,lastPos:{x:this.head.x,y:this.head.y},interpPos:{x:this.head.x,y:this.head.y},color:`hsl(${e}, 100%, 50%)`})}dir(e,t){this.vel={x:e,y:t}}reset(){this.body=[{...this.baseCell}],this.dir(0,0)}lerp(e,t,n){return e*(1-n)+t*n}interp(e){if(e>=1/(o+5))for(const e of this.body)e.interpPos.x=e.x,e.interpPos.y=e.y;else{const t=e*(o+5);for(const e of this.body)e.interpPos.x=this.lerp(e.interpPos.x,e.x,t),e.interpPos.y=this.lerp(e.interpPos.y,e.y,t)}}update(e){for(const e of this.body)e.lastPos={x:e.x,y:e.y};if(this.head.x+=this.vel.x*this.size,this.head.y+=this.vel.y*this.size,0===this.deadTick)for(let e=1;e<this.body.length;e++){const t={...this.body[e]};if(this.body[e].x=this.body[e-1].lastPos.x,this.body[e].y=this.body[e-1].lastPos.y,this.body[e].x===this.head.x&&this.body[e].y===this.head.y){this.deadTick=1,this.body[e]=t;break}this.body[e]=t}if(this.deadTick>=1){if(this.head.x-=this.vel.x*this.size,this.head.y-=this.vel.y*this.size,this.deadTick++,this.deadTick>=this.deadTicks)return this.reset(),this.deadTick=0,!0}else for(let e=1;e<this.body.length;e++)this.body[e].x=this.body[e-1].lastPos.x,this.body[e].y=this.body[e-1].lastPos.y;return!1}}}},t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={id:i,exports:{}};return e[i](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{n(654);const e=n(279),t=n(40),i=n(468),o=n(349),r=new t,s=document.createElement("canvas");o(s),document.body.appendChild(s);const a=s.getContext("2d");a.textAlign="center",a.textBaseline="middle",a.font="30px Arial";const l=window.performance.now();let d=0,h=0,c=S(),f=!1,y=0;const u={87:"up",83:"down",65:"left",68:"right",38:"up",40:"down",37:"left",39:"right",84:"hack",80:"pause"};document.body.style.backgroundColor=e.BACKGROUND_COLOR,window.addEventListener("keydown",v),window.addEventListener("keyup",v),window.addEventListener("resize",(()=>{o(s)}));let p=0,x=160,O=[];!function(){O=[];for(let e=0;e<100;e++)O.push({x:4800*Math.random()-1600,y:2700*Math.random()-900,size:2*Math.random()+1})}();const b=new i(800,800);function T(e,t){return{x:Math.round(e-b.x+s.width/2),y:Math.round(t-b.y+s.height/2)}}function v(t){const{keyCode:n}=t;if("up"===u[n]&&1!==r.vel.y&&r.dir(0,-1),"down"===u[n]&&-1!==r.vel.y&&r.dir(0,1),"left"===u[n]&&1!==r.vel.x&&r.dir(-1,0),"right"===u[n]&&-1!==r.vel.x&&r.dir(1,0),"hack"===u[n]&&"keydown"===t.type)for(let e=0;e<10;e++)w(x);if("pause"===u[n]&&"keyup"!==t.type)if(f=!f,f)a.fillStyle="rgba(0, 0, 0, 0.8)",a.fillRect(0,0,s.width,s.height),a.fillStyle="white",a.fillText("PAUSED",s.width/2,s.height/2);else{const t=Math.ceil((window.performance.now()-l)*e.SIMULATION_RATE/1e3);d=t,p=window.performance.now()+y}}function w(e){r.append(e)}function S(){const t=function(){const t=[];for(let n=0;n<e.GAME_WIDTH-e.RESOLUTION;n+=e.RESOLUTION)for(let i=0;i<e.GAME_HEIGHT-e.RESOLUTION;i+=e.RESOLUTION)for(const e of r.body)e.x!==n&&e.y!==i&&t.push({x:n,y:i});return t}();return t.length>0?t[Math.floor(Math.random()*t.length)]:{x:-1,y:-1}}!function t(n=0){if(0===p&&0!==n&&(y=n,console.log("start offset",y)),!f){a.fillStyle="black",a.fillRect(0,0,s.width,s.height),function(){{const{x:e,y:t}=T(0,0);a.strokeStyle="white",a.strokeRect(e,t,1600,900)}{const{x:e,y:t}=T(1575,950);a.fillStyle="white",a.fillText("by ZeroTix",e,t)}}(),h<5&&(a.save(),a.shadowBlur=0,a.globalAlpha=h/5,a.fillStyle="white",a.fillText("WASD TO MOVE",s.width/2,s.height/2-400),a.globalAlpha=1,a.restore());const t=(n-p)/1e3;p=n,h+=t;const i=Math.ceil((window.performance.now()-l)*e.SIMULATION_RATE/1e3);for(;d<i;)r.update(x)&&(c=S()),d++;r.interp(t),r.head.interpPos.x+e.RESOLUTION>=c.x&&r.head.interpPos.x<=c.x+e.RESOLUTION&&r.head.interpPos.y+e.RESOLUTION>=c.y&&r.head.interpPos.y<=c.y+e.RESOLUTION&&(c=S(),x+=20,x%=360,w(x)),0===r.deadTick&&(r.head.interpPos.x>=e.GAME_WIDTH-e.RESOLUTION||r.head.interpPos.x<=0||r.head.interpPos.y>=e.GAME_HEIGHT-e.RESOLUTION||r.head.interpPos.y<=0)&&(r.deadTick=1),r.deadTick>0?s.style.filter="grayscale(1) blur(5px)":"none"!==s.style.filter&&(s.style.filter="none"),t>=1?b.setTo(r.head.x,r.head.y):b.interp(r.head.x,r.head.y,t),function(){a.fillStyle="white";for(const e of O){const{x:t,y:n}=T(e.x,e.y);a.beginPath(),a.arc(t,n,e.size,0,2*Math.PI),a.fill()}}(),function(){for(const{interpPos:t,color:n}of r.body){a.fillStyle=n,a.strokeStyle=n,a.shadowColor=n,a.lineWidth=3;const{x:i,y:o}=T(t.x,t.y);a.fillRect(i,o,e.RESOLUTION,e.RESOLUTION),a.strokeRect(i,o,e.RESOLUTION,e.RESOLUTION)}}(),function(){a.fillStyle=e.FOOD_COLOR,a.strokeStyle=e.FOOD_COLOR,a.lineWidth=3;const{x:t,y:n}=T(c.x,c.y);a.fillRect(t,n,e.RESOLUTION,e.RESOLUTION),a.strokeRect(t,n,e.RESOLUTION,e.RESOLUTION)}(),a.fillStyle="white",a.fillText(`${r.body.length}`,s.width/2,s.height-20)}requestAnimationFrame(t)}()})()})();