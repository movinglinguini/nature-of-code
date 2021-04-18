import { buildChapter } from '../shared/build-chapter.js'; 
import * as UTILS from '../shared/utils.js';

class BouncingBall {
  constructor(canvasWidth, canvasHeight) {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.speeds = {
      x: 2,
      y: 3,
    };

    this.maxSpeeds = {
      x: 10,
      y: 10,
    };

    this.bounds = {
      x: [0, canvasWidth],
      y: [0, canvasHeight],
    };
  }

  move() {
    this.x += this.speeds.x;
    this.y += this.speeds.y;

    if (this.x <= this.bounds.x[0] || this.x >= this.bounds.x[1]) {
      this.speeds.x *= -1;
    }

    if (this.y <= this.bounds.y[0] || this.y >= this.bounds.y[1]) {
      this.speeds.y *= -1;
    }
  }

}

class VectBouncingBall extends BouncingBall {
  constructor(canvasWidth, canvasHeight, mass=10, mu=0.01) {
    super(canvasWidth, canvasHeight);
    this.position = createVector(this.x, this.y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(this.speeds.x, this.speeds.y);
    this.mass = mass || 10;
    this.mu = mu || 0.01;
  }

  move() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    if (!UTILS.isInInterval(this.position.x, this.bounds.x[0], this.bounds.x[1])) {
      this.velocity.x *= -1;
    }

    if (!UTILS.isInInterval(this.position.y, this.bounds.y[0], this.bounds.y[1])) {
      this.velocity.y *= -1;
    }
    
    this.velocity.x = UTILS.clamp(this.velocity.x, -this.maxSpeeds.x, this.maxSpeeds.x);
    this.velocity.y = UTILS.clamp(this.velocity.y, -this.maxSpeeds.y, this.maxSpeeds.y);

    this.position.x = UTILS.clamp(this.position.x, this.bounds.x[0], this.bounds.y[1]);
    this.position.y = UTILS.clamp(this.position.y, this.bounds.y[0], this.bounds.y[1]);

    // apply friction
    const friction_ = this.velocity.copy();
    friction_.mult(-1);
    friction_.normalize();
    friction_.mult(this.mu);

    this.applyForce(friction_);
  }

  
  applyForce(force) {
    const force_ = force.div(this.mass);
    this.acceleration.add(force_);
  }

  accelerate(x, y) {
    this.acceleration = createVector(x, y);
  }
}

const _chOneGlobals = {
  canvasWidth: 400,
  canvasHeight: 400,
  canvasBackground: 225,
};

export const ChapterOne = buildChapter('chapter-1');
ChapterOne.init = () => {
  createCanvas(_chOneGlobals.canvasWidth, _chOneGlobals.canvasHeight);
  background(_chOneGlobals.canvasBackground);

  _chOneGlobals.ball = new VectBouncingBall(_chOneGlobals.canvasWidth, _chOneGlobals.canvasHeight, 10);
};

ChapterOne.afterDraw = () => {
  _chOneGlobals.ball.move();
  background('rgba(225, 225, 225, 0.25)');
  ChapterOne.__drawBall(_chOneGlobals.ball.position.x, _chOneGlobals.ball.position.y);
}

ChapterOne.__drawBall = (x, y) => {
  circle(x, y, 20);
};

ChapterOne.__subChapters = {
  'bouncing-ball-no-vectors': {
    setup() {
      // _chOneGlobals.ball = new BouncingBall(_chOneGlobals.canvasWidth, _chOneGlobals.canvasHeight);
    },
    draw() {
      _chOneGlobals.ball.move();
      background('rgba(225, 225, 225, 0.05)');
      ChapterOne.__drawBall(_chOneGlobals.ball.x, _chOneGlobals.ball.y);
    }
  },

  'bouncing-ball-with-vectors': {
    setup() {
      _chOneGlobals.ball = new VectBouncingBall(_chOneGlobals.canvasWidth, _chOneGlobals.canvasHeight, 10, 0);
    },
    draw() {
      _chOneGlobals.ball.move();
      background('rgba(225, 225, 225, 0.25)');
      ChapterOne.__drawBall(_chOneGlobals.ball.position.x, _chOneGlobals.ball.position.y);
    }
  },

  'bouncing-ball-random-accel': {
    setup() {
      _chOneGlobals.ball = new VectBouncingBall(_chOneGlobals.canvasWidth, _chOneGlobals.canvasHeight);

      _chOneGlobals.noise = {
        vect: createVector(0, 1000),
        delta: 0.001,
      }
    },
    draw() {
      _chOneGlobals.ball.accelerate(random(-1, 1, noise(_chOneGlobals.noise.vect.x)), random(-1, 1, noise(_chOneGlobals.noise.vect.y)));
      _chOneGlobals.ball.move();

      background('rgba(225, 225, 225, 0.25)');
      ChapterOne.__drawBall(_chOneGlobals.ball.position.x, _chOneGlobals.ball.position.y);
      _chOneGlobals.noise.vect.add(_chOneGlobals.noise.delta, _chOneGlobals.noise.delta);
    }
  },

  'bouncing-ball-to-mouse': {
    setup() {
      _chOneGlobals.ball = new VectBouncingBall(_chOneGlobals.canvasWidth, _chOneGlobals.canvasHeight);
    },
    draw() {
      const mousePos = createVector(mouseX, mouseY);
      mousePos.x = clamp(mousePos.x, 0, _chOneGlobals.canvasWidth);
      mousePos.y = clamp(mousePos.y, 0, _chOneGlobals.canvasHeight);

      const diff = mousePos.sub(_chOneGlobals.ball.position);
      const normDiff = diff.normalize().mult(diff.mag());
      
      _chOneGlobals.ball.accelerate(
        // Math.sign(diffVect.x) * random(0, Math.abs(diffVect.x)),
        normDiff.x,
        // Math.sign(diffVect.y) * random(0, Math.abs(diffVect.y)),
        normDiff.y,
      );

      _chOneGlobals.ball.move();
      background('rgba(225, 225, 225, 0.25)');
      ChapterOne.__drawBall(_chOneGlobals.ball.position.x, _chOneGlobals.ball.position.y);
    },
  },

  
  'bouncing-ball-with-gravity': {
    setup() {
    },
    draw() {
      _chOneGlobals.ball.applyForce(createVector(0, 0.1));
    },
  },

  'bouncing-ball-with-gravity-and-friction': {
    setup() {
      _chOneGlobals.ball = new VectBouncingBall(_chOneGlobals.canvasWidth, _chOneGlobals.canvasHeight, 10, 0.01);
    },
    draw() {
      _chOneGlobals.ball.applyForce(createVector(0, 0.01));
    }
  }
}