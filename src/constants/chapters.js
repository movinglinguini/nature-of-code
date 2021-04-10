const AVAILABLE_CHAPTERS = [
  // Introduction
  {
    title: 'Introduction',
    key: 'introduction',
    tabs: {
      'random-walk-1': {
        title: 'Basic Random Walk',
        description: 'In this example, the points move in uniformly random directions.',
      },
      'random-walk-2': {
        title: 'Random Walk with Tendency',
        description: 'In this example, the points have a tendency to move in one X direction and one Y direction.'
      },
      'random-walk-3': {
        title: 'Random Walk with Dynamic Tendencies',
        description: 'In this example, the points have a tendency to move toward the mouse.'
      },
      'random-walk-4': {
        title: 'Random Walk with Gaussian Probability',
        description: 'In this example, we use a Gaussian distribution to generate random numbers rather than a uniform distribution.',
      },
      'random-walk-5': {
        title: 'Random Walk with Perlin Noise',
        description: 'In this example, we use Perlin Noise to generate random numbers.'
      }
    },
  },
  // Chapter 1
  {
    title: 'Chapter 1. Vectors',
    key: 'chapter-1',
    tabs: {
      'bouncing-ball-no-vectors': {
        title: 'Bouncing with No Vectors',
        description: 'In this example, we\'re going to implement a bouncing ball that doesn\'t use built-in P5js vectors.'
      },
      'bouncing-ball-with-vectors': {
        title: 'Bouncing with Vectors',
        description: 'In this example, we are using the P5js Vector class. This should look practically identical to the first example.'
      },
      'bouncing-ball-random-accel': {
        title: 'Bouncing with Random Accelaration',
        description: 'In this example, the ball will randomly accelarate. This example will make the ball appear to be randomly walking!',
      },
      'bouncing-ball-to-mouse': {
        title: 'Bouncing Ball Accelarates Toward Mouse',
        description: 'In this example, the ball will accelarate toward the mouse.',
      }
    }
  }
]