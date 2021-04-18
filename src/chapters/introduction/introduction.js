import { buildChapter } from '../shared/build-chapter.js'; 

class Walker {
  constructor(canvasWidth, canvasHeight) {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.speed = 1;
    this.randomFunction = (horizTendency, vertTendency) => {
      return { 
        x: this.clamp(Math.random() * (2 + horizTendency) - 1, -1, 1),
        y: this.clamp(Math.random() * (2 + vertTendency) - 1, -1, 1),
      };
    }
  }

  step(horizTendency = 0, vertTendency = 0) {
    const horizTendency_ = this.clamp(horizTendency, -1, 1);
    const vertTendency_ = this.clamp(vertTendency, -1, 1);
    
    const steps = this.randomFunction(horizTendency_, vertTendency_);

    this.x += steps.x * this.speed;
    this.y += steps.y * this.speed;

    this.x = this.clamp(this.x, 0, _introGlobals.canvasWidth);
    this.y = this.clamp(this.y, 0, _introGlobals.canvasHeight);
  }

  clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }
}

const _introGlobals = {
  canvasWidth: 400,
  canvasHeight: 400,
  canvasBackground: 225,
};

export const Introduction = buildChapter('introduction');

Introduction.init = () => {
    clear();
    createCanvas(_introGlobals.canvasWidth, _introGlobals.canvasHeight);
    background(_introGlobals.canvasBackground);
};


Introduction.__createNewWalker = () => {
  _introGlobals.walker = new Walker(_introGlobals.canvasWidth, _introGlobals.canvasHeight);
};

Introduction.__displayWalker = (color = 0) => {
  const walker = _introGlobals.walker;
  stroke(color);
  point(walker.x, walker.y);
}

Introduction.__subChapters = {
  'random-walk-1': {
    setup() {
      Introduction.__createNewWalker();
      _introGlobals.walker.speed = 2;
    },
    draw() {
      const walker = _introGlobals.walker;
      walker.step();
      Introduction.__displayWalker();
    },
  },

  'random-walk-2': {
    setup() {
      Introduction.__createNewWalker();
    },

    draw() {
      const walker = _introGlobals.walker;
      walker.step(0.2, 0.3);
      Introduction.__displayWalker();
    },
  },

  'random-walk-3': {
    setup() {
      Introduction.__createNewWalker();
      _introGlobals.walker.speed = 3;
    },

    draw() {
      const walker = _introGlobals.walker;
      const lastX = walker.x;
      const lastY = walker.y;

      const signX = Math.sign(mouseX - lastX);
      const signY = Math.sign(mouseY - lastY);
      
      walker.step(0.3 * signX, 0.3 * signY);
      Introduction.__displayWalker();
    }
  },

  'random-walk-4': {
    setup() {
      Introduction.__createNewWalker();
      const walker = _introGlobals.walker;
      walker.randomFunction = (horizTendency, vertTendency) => {
        return {
          x: walker.clamp(randomGaussian(0, 1) * (2 + horizTendency), -1, 1),
          y: walker.clamp(randomGaussian(0, 1) * (2 + vertTendency), -1, 1),
        }
      }
    },

    draw() {
      _introGlobals.walker.step(0, 0);
      Introduction.__displayWalker();
    }
  },

  'random-walk-5': {
    setup() {
      Introduction.__createNewWalker();
      _introGlobals.noise = {
        x: 0,
        y: 1000,
        step: 0.01,
      };

      const walker = _introGlobals.walker;
      walker.randomFunction = (horizTendency, vertTendency) => {
        const nx = noise(_introGlobals.noise.x);
        const ny = noise(_introGlobals.noise.y);

        _introGlobals.noise.x += _introGlobals.noise.step;
        _introGlobals.noise.y += _introGlobals.noise.step;

        return {
          x: walker.clamp(nx * (2 + horizTendency) - 1, -1, 1),
          y: walker.clamp(ny * (2 + vertTendency) - 1, -1, 1),
        };
      };

      walker.speed = 1.5;
    },

    draw() {
      _introGlobals.walker.step(0, 0);
      Introduction.__displayWalker();
    }
  }
};



