

const _chGlobals = {
  canvasWidth: 400,
  canvasHeight: 400,
  canvasBackground: 225,
};

const Chapter = buildChapter('chapter-2');
Chapter.init = () => {
  createCanvas(_chGlobals.canvasWidth, _chGlobals.canvasHeight);
  background(_chGlobals.canvasBackground);

  _chGlobals.ball = new VectBouncingBall(_chGlobals.canvasWidth, _chGlobals.canvasHeight, 10);
};

Chapter.afterDraw = () => {
  _chOneGlobals.ball.move();
  background('rgba(225, 225, 225, 0.25)');
  Chapter.__drawBall(_chOneGlobals.ball.position.x, _chOneGlobals.ball.position.y);
}

Chapter.__drawBall = (x, y) => {
  circle(x, y, 20);
};

Chapter.__subChapters = {};