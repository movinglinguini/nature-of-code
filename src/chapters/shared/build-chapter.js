import { CHAPTER_MANAGER, CHAPTER_FUNCTIONS } from '../../chapter-manager/chapter-manager.js';

export function buildChapter(chapterKey) {
  const newChapter = ({
    __needsUpdate: false,
    __chapterKey: chapterKey,
    __delta: 0,
    __lastTime: new Date().getTime(),

    init() {},
    setup() {
      this.init();
      this.__delta = 0;
      this.__lastTime = new Date().getTime();

      try {
        this.__subChapters[CHAPTER_MANAGER.activeSubChapter].setup();
      } catch(err) {
        console.warn(err);
      }
    },
    beforeDraw() {},
    draw() {
      const newTime = new Date().getTime();
      this.__delta = Math.abs(newTime - this.__lastTime);
      this.__lastTime = newTime;

      this.beforeDraw();

      try {
        this.__subChapters[CHAPTER_MANAGER.activeSubChapter].draw();
      } catch (err) {
        console.warn(err);
      }

      this.afterDraw();
      
      if (this.__needsUpdate) {
        this.setup();
        this.__needsUpdate = false;
      }
    },
    afterDraw() {},
    __subChapters: {},
  });

  CHAPTER_MANAGER.subscribeToChapterChange(chapterKey, (chapterKey_) => {});
  
  CHAPTER_MANAGER.subscribeToSubChapterChange(chapterKey, (
    (subChapterKey_) => {
      newChapter.setup();
    }).bind(newChapter)
  );

  CHAPTER_FUNCTIONS.set(chapterKey, newChapter);

  return newChapter;
}