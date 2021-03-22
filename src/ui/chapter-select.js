const chapterSelectEl = document.querySelector('.chapters-container select');

AVAILABLE_CHAPTERS.forEach(chapter => {
  const newOption = document.createElement('option');
  newOption.textContent = chapter.title;
  newOption.value = chapter.key;

  chapterSelectEl.append(newOption);
});

chapterSelectEl.addEventListener('change', ({ target }) => {
  console.log(target.value);
});
