import { useQuery } from "@tanstack/react-query";
import TopicService from "../services/TopicService.js";

export const useTopic = () => {
    return useQuery({
        queryKey: ["topics"],
        queryFn: () => TopicService.getTopics(),
        keepPreviousData: true
    })
};