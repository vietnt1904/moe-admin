import { instance } from "../lib/axios";

const StoryService = {
  async getStories(page = 1, limit = 10) {
    const stories = await instance
      .get("/story", {
        params: {
          page: page,
          limit: limit,
        },
      })
      .then(({ data }) => data);
    return stories;
  },

  async getStoryById(id, slug) {
    const story = await instance
      .get(`/story/${slug}-${id}`)
      .then(({ data }) => data?.data);
    return story;
  },

  async getStoriesSameAuthor(id) {
    const stories = await instance
      .get(`/story/${id}/related`)
      .then(({ data }) => data);
    return stories;
  },

  async getStoriesByAuthor(id) {
    const stories = await instance
      .get(`/story/${id}/related`)
      .then(({ data }) => data);
    return stories;
  },

  async writeStory(data) {
    const story = await instance
      .post("/story/writestory", data)
      .then(({ data }) => data);
    return story;
  },
};

export default StoryService;
