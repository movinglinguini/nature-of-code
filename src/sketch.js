const chapters = new Map([
  ['introduction', Introduction],
  ['chapter-one', ChapterOne],
]);

const selectedChapter = chapters.get('introduction');

function setup() {
  selectedChapter.setup();
}

function draw() {
  selectedChapter.draw();
}
