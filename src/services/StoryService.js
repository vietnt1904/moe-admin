import { instance } from "../lib/axios";

const StoryService = {
  async getStories(page = 1, limit = 10) {
    const stories = await instance
      .get("/admin/story/allstories", {
        params: {
          page: page,
          limit: limit,
        },
      })
      .then(({ data }) => data || []);
    return stories;
  },

  async getStoryById(id) {
    const story = await instance
      .get(`/admin/story/allstories/${id}`)
      .then(({ data }) => data?.data);
    return story;
  },

  async getPendingStories(page = 1, limit = 10) {
    const stories = await instance
      .get("/admin/story/pendingstories", {
        params: {
          page: page,
          limit: limit,
        },
      })
      .then(({ data }) => data || []);
    return stories;
  },

  async getPendingStoryById(id) {
    const story = await instance
      .get(`/admin/story/pendingstories/${id}`)
      .then(({ data }) => data?.data);
    return story;
  },

  async updatePendingStory(id, data) {
    const story = await instance
      .patch(`/admin/story/pendingstories/${id}`, data)
      .then(({ data }) => data?.data);
    return story;
  },

};

export default StoryService;
