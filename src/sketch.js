import { CHAPTER_MANAGER, CHAPTER_FUNCTIONS } from './chapter-manager/chapter-manager.js';

window.setup = function() {
  CHAPTER_FUNCTIONS.get(CHAPTER_MANAGER.activeChapter).setup();
}

window.draw = function() {
  const newtime = new Date().getTime();
  CHAPTER_FUNCTIONS.get(CHAPTER_MANAGER.activeChapter).draw();
}