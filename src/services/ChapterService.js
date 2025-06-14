import { instance } from "../lib/axios";

const ChapterService = {
  async getChaptersByStoryId(storyId) {
    const chapters = await instance
      .get(`/admin/chapter/allstorychapters/${storyId}`, {
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

  // =============================== //

  async getPendingChapters(page = 1, limit = 10) {
    const chapters = await instance
      .get("/admin/chapter/pendingchapters", {
        params: {
          page: page,
          limit: limit,
        },
      })
      .then(({ data }) => data?.chapters);
    return chapters;
  },

  async getPendingChapterById(id) {
    const chapter = await instance
      .get(`/admin/chapter/pending/${id}`)
      .then(({ data }) => data?.data);
    return chapter;
  },

  async updatePendingChapter(id, data) {
    const chapter = await instance
      .patch(`/admin/chapter/pending/${id}`, data)
      .then(({ data }) => data?.data);
    return chapter;
  },

  async getChapterByIdAdmin (id) {
    const chapter = await instance
      .get(`/admin/chapter/allchapters/${id}`)
      .then(({ data }) => data?.data);
    return chapter;
  },

};

export default ChapterService;
