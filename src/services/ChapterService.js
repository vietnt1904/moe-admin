import { instance } from "../lib/axios";

const ChapterService = {
  async getChaptersByStoryId(storyId) {
    const chapters = await instance
      .get("/chapter", {
        params: {
          storyId: storyId,
        },
      })
      .then(({ data }) => data?.chapters);
    return chapters;
  },

  async getChapterById(id, slug) {
    const chapter = await instance
      .get(`/chapter/${slug}-${id}`)
      .then(({ data }) => data?.data);
    return chapter;
  },

  async getPreviousChapter(id, storyId, chapterNumber) {
    const chapter = await instance
      .get(`/chapter/${id}/previous`, {
        params: {
          storyId: storyId,
          chapterNumber: chapterNumber,
        },
      })
      .then(({ data }) => data?.data);
    return chapter;
  },

  async getNextChapter(id, storyId, chapterNumber) {
    const chapter = await instance
      .get(`/chapter/${id}/next`, {
        params: {
          storyId: storyId,
          chapterNumber: chapterNumber,
        },
      })
      .then(({ data }) => data?.data);
    return chapter;
  },
};

export default ChapterService;
