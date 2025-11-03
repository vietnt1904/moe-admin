import { instance } from "../lib/axios";

const TopicService = {
    async getTopics() {
        const topics = instance.get("/topic").then(({ data }) => data.topics);
        return topics;
    },

    async getAdminTopics() {
        const topics = instance.get("/admin/topic").then(({ data }) => data.topics);
        return topics;
    },

    async addTopic(data) {
        const topic = instance
            .post("/topic", data)
            .then(({ data }) => data);
        return topic;
    },
    
    async updateTopic(id, data) {
        const topic = instance
            .patch(`/topic/${id}`, data)
            .then(({ data }) => data?.data);
        return topic;
    }
};

export default TopicService;