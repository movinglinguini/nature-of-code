function buildChapter(chapterKey) {
  const newChapter = ({
    __needsUpdate: false,
    __chapterKey: chapterKey,
    init() {},
    setup() {
      this.init();

      try {
        this.__subChapters[CHAPTER_MANAGER.activeSubChapter].setup();
      } catch(err) {
        console.warn(err);
      }
    },
    beforeDraw() {},
    draw() {
      this.beforeDraw();

      try {
        this.__subChapters[CHAPTER_MANAGER.activeSubChapter].draw();
      } catch (err) {
        console.warn(err);
      }
      
      if (this.__needsUpdate) {
        this.setup();
        this.__needsUpdate = false;
      }
    },

    __subChapters: {},
  });

  CHAPTER_MANAGER.subscribeToChapterChange(chapterKey, (chapterKey_) => {});
  
  CHAPTER_MANAGER.subscribeToSubChapterChange(chapterKey, (
    (subChapterKey_) => {
      console.log(subChapterKey_);
      newChapter.setup();
    }).bind(newChapter)
  );

  return newChapter;
}