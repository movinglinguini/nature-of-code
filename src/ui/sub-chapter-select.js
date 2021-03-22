const chapterToSub = new Map(
  AVAILABLE_CHAPTERS.map(chapter => {
    return [chapter.key, chapter.tabs];
  }),
);
const subChapterContainerEl = document.querySelector('.sub-chapter-container select');

function generateSubChapters(activeChapter) {
  subChapterContainerEl.childNodes.forEach(child => child.empty());
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
