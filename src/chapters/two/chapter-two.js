import { buildChapter } from '../shared/build-chapter.js';
import { PhysicsBody } from '../shared/classes/physics-body.js';
import { Attractor } from '../shared/classes/attractor.js';
import { degToRad, random } from '../shared/utils.js';

const canvasWidth = 450;
const canvasHeight = 500;
const canvasBackground = 255;

const bodies = [];
const attractors = [];

let time = 0;

const Chapter = buildChapter('chapter-2');
Chapter.init = () => {
  createCanvas(canvasWidth, canvasHeight);
  background(canvasBackground);
  bodies.length = 0;
  attractors.length = 0;
  // _chGlobals.ball = new VectBouncingBall(_chGlobals.canvasWidth, _chGlobals.canvasHeight, 10);
};

Chapter.beforeDraw = () => {
  attractors.forEach(attr => {
    bodies.forEach(body => {
      attr.attract(body);
    });
  });
}

Chapter.afterDraw = () => {
  background('rgba(150, 150, 150, 0.4)');

  [...bodies, ...attractors].forEach(body => body.update());

  time += 0;
}

Chapter.__subChapters = {
  attractors: [],
  bodies: [],

  'one-object-with-static-attractor': {
    setup() {
      const newBody = new PhysicsBody(new p5.Vector(canvasWidth / 3, 2 * canvasHeight / 3), 10);
      const newAttractor = new Attractor(new p5.Vector(canvasWidth / 2, canvasHeight / 2), 250);

      newBody.velocity = new p5.Vector(-1.5, 5);

      newBody.draw = (function(){
        fill('white');
        stroke('rgba(150, 150, 150, 0)');
        circle(this.position.x, this.position.y, 20);
      }).bind(newBody);
      
      newAttractor.draw = (function() {
        fill('rgba(100, 200, 255, 1)');
        circle(this.position.x, this.position.y, 40);
      }).bind(newAttractor);

      bodies.push(newBody);
      attractors.push(newAttractor);
    },
    draw() {},
  },

  'one-object-with-oscillating-attractor': {
    setup() {
      const newBody = new PhysicsBody(new p5.Vector(canvasWidth / 3, 2 * canvasHeight / 3), 10);
      const newAttractor = new Attractor(new p5.Vector(canvasWidth / 2, canvasHeight / 2), 250);

      newBody.velocity = new p5.Vector(-1.5, 5);

      newBody.draw = (function(){
        fill('white');
        stroke('rgba(150, 150, 150, 0)');
        circle(this.position.x, this.position.y, 20);
      }).bind(newBody);
      
      newAttractor.draw = (function() {
        fill('rgba(100, 200, 255, 1)');
        circle(this.position.x, this.position.y, 40);
      }).bind(newAttractor);

      bodies.push(newBody);
      attractors.push(newAttractor);
    },
    draw() {
      attractors[0].velocity = new p5.Vector(
        Math.sin(degToRad(Chapter.__lastTime) * (Math.PI / 16)),
        Math.cos(degToRad(Chapter.__lastTime) * (Math.PI / 32))
      );
    }
  },

  'objects-with-mutual-attraction': {
    setup() {
      const newBody = new Attractor(new p5.Vector(canvasWidth / 3, 2 * canvasHeight / 3), 125);
      const newAttractor = new Attractor(new p5.Vector(canvasWidth / 2, canvasHeight / 2), 250);

      // newBody.draw = (function(){
      //   fill('white');
      //   stroke('rgba(150, 150, 150, 0)');
      //   circle(this.position.x, this.position.y, 20);
      // }).bind(newBody);
      
      // newAttractor.draw = (function() {
      //   fill('rgba(100, 200, 255, 1)');
      //   circle(this.position.x, this.position.y, 40);
      // }).bind(newAttractor);
      
      for (let i = 0; i < 4; i += 1) {
        const posX = random(10, canvasWidth - 10, Math.random);
        const posY = random(10, canvasHeight - 10, Math.random);

        const newAttractor = new Attractor(new p5.Vector(posX, posY), Math.random() * 250);
        newAttractor.G = 0.75 * Math.random();
        const fillColor = Math.round(Math.random() * 265);
        newAttractor.draw = (function() {
          fill(fillColor);
          stroke(Math.abs(fillColor - 265));
          circle(this.position.x, this.position.y, newAttractor.mass * .5);
        });
        attractors.push(newAttractor);
      }
    },
    draw() {
      // attractors[0].velocity = new p5.Vector(
      //   Math.sin(degToRad(Chapter.__lastTime) * (Math.PI / 16)),
      //   Math.cos(degToRad(Chapter.__lastTime) * (Math.PI / 32))
      // );

      for (let i = 0; i < attractors.length; i += 1) {
        for (let j = 0; j < attractors.length; j += 1) {
          if (i === j) { continue; }
          attractors[i].attract(attractors[j]);
          attractors[j].attract(attractors[i]);
        }
      }
    }
  }
};
