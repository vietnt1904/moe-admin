import { instance } from "../lib/axios";

const TopicService = {
    async getTopics() {
        const topics = instance.get("/topic").then(({ data }) => data.topics);
        return topics;
    }
};

export default TopicService;