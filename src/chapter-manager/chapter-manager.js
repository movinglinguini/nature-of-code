const CHAPTER_MANAGER = {
  __activeChapter: localStorage.getItem('_nature-of-code-chapter') || 'introduction',
  __activeSubChapter: localStorage.getItem('_nature-of-code-subchapter') || 'random-walk-1',

  __chapterWatchers: new Map(),
  __subChapterWatchers: new Map(),

  get activeChapter() {
    return this.__activeChapter;
  },
  get activeSubChapter() {
    return this.__activeSubChapter;
  },
  
  onSelectChapter(chapterKey) {
    this.__activeChapter = chapterKey;
    this.__chapterWatchers.forEach(cb => cb(chapterKey));

    localStorage.setItem('_nature-of-code-chapter', chapterKey);
  },
  onSelectSubChapter(subChapterKey) {
    this.__activeSubChapter = subChapterKey;
    this.__subChapterWatchers.forEach(cb => cb(subChapterKey));

    localStorage.setItem('_nature-of-code-subchapter', subChapterKey);
  },

  subscribeToChapterChange(key, cb) {
    this.__chapterWatchers.set(key, cb);
  },
  subscribeToSubChapterChange(key, cb) {
    this.__subChapterWatchers.set(key, cb);
  },
};
