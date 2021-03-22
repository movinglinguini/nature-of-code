CHAPTER_MANAGER.subscribeToSubChapterChange('ui-description', () => {
  writeDescription();
});

function writeDescription() {
  const chapterDescriptionEl = document.querySelector('.chapter-description');

  // chapterDescriptionEl.querySelector('.chapter-name').textContent = AVAILABLE_CHAPTERS[CHAPTER_MANAGER.activeChapter].title;
  chapterDescriptionEl.querySelector('.sub-chapter-description').textContent = AVAILABLE_CHAPTERS
    .find(ch => ch.key === CHAPTER_MANAGER.activeChapter)
      .tabs[CHAPTER_MANAGER.activeSubChapter].description;
}

writeDescription();