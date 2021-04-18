import { CHAPTER_MANAGER } from '../chapter-manager/chapter-manager.js';
import { AVAILABLE_CHAPTERS } from '../constants/chapters.js';

const chapterSelectEl = document.querySelector('.chapters-container select');

AVAILABLE_CHAPTERS.forEach(chapter => {
  const newOption = document.createElement('option');
  newOption.textContent = chapter.title;
  newOption.value = chapter.key;

  chapterSelectEl.append(newOption);
});

chapterSelectEl.value = CHAPTER_MANAGER.activeChapter;
chapterSelectEl.addEventListener('change', ({ target }) => {
  CHAPTER_MANAGER.onSelectChapter(target.value);
});

CHAPTER_MANAGER.subscribeToChapterChange('chapter-select', (chapterKey) => {
});
