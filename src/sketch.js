// const selectedChapter = chapters.get('introduction');
// CHAPTER_MANAGER.subscribeToSubChapterChange((chapterKey) => {
//   selectedChapter = 
// });

function setup() {
  CHAPTER_FUNCTIONS.get(CHAPTER_MANAGER.activeChapter).setup();
}

function draw() {
  CHAPTER_FUNCTIONS.get(CHAPTER_MANAGER.activeChapter).draw();
}

