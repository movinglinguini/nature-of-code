import { CHAPTER_MANAGER } from '../chapter-manager/chapter-manager.js';
import { AVAILABLE_CHAPTERS } from '../constants/chapters.js';

const chapterToSub = new Map(
  AVAILABLE_CHAPTERS.map(chapter => {
    return [chapter.key, chapter.tabs];
  }),
);
const subToChapter = new Map()
AVAILABLE_CHAPTERS.map(chapter => {
  Object.keys(chapter.tabs).forEach((tk) => {
    subToChapter.set(tk, chapter.key);
  });
});

const subChapterContainerEl = document.querySelector('.sub-chapter-container select');

function generateSubChapters(activeChapter) {
  document.querySelectorAll('.sub-chapter-container select option').forEach(child => child.remove());
  subChapterContainerEl.setAttribute('value', CHAPTER_MANAGER.activeSubChapter);

  const tabs = chapterToSub.get(activeChapter);
  Object.keys(tabs).forEach(tk => {
    const newOption = document.createElement('option');
    newOption.textContent = tabs[tk].title;
    newOption.value = tk;

    if (tk === CHAPTER_MANAGER.activeSubChapter) {
      newOption.setAttribute('selected', true);
    }
    
    subChapterContainerEl.append(newOption);
  });
  
}

generateSubChapters(CHAPTER_MANAGER.activeChapter);
subChapterContainerEl.addEventListener('change', ({ target }) => {
  CHAPTER_MANAGER.onSelectSubChapter(target.value);
});

CHAPTER_MANAGER.subscribeToChapterChange('sub-chapter-select', (chapterKey) => {
  generateSubChapters(chapterKey);
});
