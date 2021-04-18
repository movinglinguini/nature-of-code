// const selectedChapter = chapters.get('introduction');
// CHAPTER_MANAGER.subscribeToSubChapterChange((chapterKey) => {
//   selectedChapter = 
// });

// function setup() {
//   CHAPTER_FUNCTIONS.get(CHAPTER_MANAGER.activeChapter).setup();
// }

// function draw() {
//   CHAPTER_FUNCTIONS.get(CHAPTER_MANAGER.activeChapter).draw();
// }
import { CHAPTER_MANAGER, CHAPTER_FUNCTIONS } from './chapter-manager/chapter-manager.js';

window.setup = function() {
  CHAPTER_FUNCTIONS.get(CHAPTER_MANAGER.activeChapter).setup();
}

window.draw = function() {
  CHAPTER_FUNCTIONS.get(CHAPTER_MANAGER.activeChapter).draw();
}